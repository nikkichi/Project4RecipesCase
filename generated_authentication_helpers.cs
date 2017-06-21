using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using SimpleModelsAndRelations;
using SimpleModelsAndRelations.Models;

namespace SimpleModelsAndRelations.Filters
{
  public class RestrictToUserTypeAttribute : ActionFilterAttribute
  {
    private readonly string[] user_types;
    public static string ApiToken {get;set;} = null;

    public RestrictToUserTypeAttribute(string[] user_types)
    {
      this.user_types = user_types;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
      var HttpContext = context.HttpContext;
      dynamic controller = context.Controller;
      var _context = controller._context as SimpleModelsAndRelationsContext;
      var session = HttpContext.Get<LoggableEntities>(_context);


      if ((ApiToken != null && context.HttpContext.Request.Headers["ApiToken"] == ApiToken) ||
          user_types.Any(user_type =>
            user_type == "*"
            )) {
        base.OnActionExecuting(context);
      } else {
        context.Result = new RedirectResult("/Home/Unauthorised");
      }
    }
  }
}

namespace SimpleModelsAndRelations
{
  public static class ApplicationSessionManager {
    public static bool Exists(this HttpContext HttpContext, SimpleModelsAndRelationsContext _context) {
      if (HttpContext.Request.Cookies.ContainsKey("SimpleModelsAndRelationsContext")) {
        var old_cookie = HttpContext.Request.Cookies["SimpleModelsAndRelationsContext"];
        var old_session = _context.Session.FirstOrDefault(s => s.CookieName == old_cookie);
        return old_session != null;
      }
      return false;
    }
    public static T Get<T>(this HttpContext HttpContext, SimpleModelsAndRelationsContext _context) {
      if (!HttpContext.Request.Cookies.ContainsKey("SimpleModelsAndRelationsContext"))
        return default(T);
      var old_cookie = HttpContext.Request.Cookies["SimpleModelsAndRelationsContext"];
      var old_session = _context.Session.FirstOrDefault(s => s.CookieName == old_cookie);
      if (old_session != null)
        return JsonConvert.DeserializeObject<T>(old_session.Content);
      return default(T);
    }
    public static void Set<T>(this HttpContext HttpContext, SimpleModelsAndRelationsContext _context, T payload) {
      var cookie = HttpContext.Request.Cookies["SimpleModelsAndRelationsContext"];
      var session = _context.Session.FirstOrDefault(s => s.CookieName == cookie);
      if (session != null) {
        session.Content = JsonConvert.SerializeObject(payload);
      } else {
        session = new Session() { CookieName = cookie, Content = JsonConvert.SerializeObject(payload), CreatedAt = DateTime.Now };
        _context.Session.Add(session);
      }
      _context.SaveChanges();
    }
    public static void Login<T>(this HttpContext HttpContext, SimpleModelsAndRelationsContext _context, T payload) {
      HttpContext.Logout(_context);
      var random_id = PasswordHasher.RandomPassword;
      HttpContext.Response.Cookies.Append("SimpleModelsAndRelationsContext", random_id,
        new Microsoft.AspNetCore.Http.CookieOptions()
        {
          Expires = DateTimeOffset.Now.AddYears(1)
        });
      var new_session = new Session() { CookieName = random_id, Content = JsonConvert.SerializeObject(payload), CreatedAt = DateTime.Now };
      _context.Session.Add(new_session);
      _context.SaveChanges();
    }
    public static void Logout(this HttpContext HttpContext, SimpleModelsAndRelationsContext _context) {
      if (HttpContext.Request.Cookies.ContainsKey("SimpleModelsAndRelationsContext")) {
        var old_cookie = HttpContext.Request.Cookies["SimpleModelsAndRelationsContext"];
        var old_session = _context.Session.FirstOrDefault(s => s.CookieName == old_cookie);
        if (old_session != null) {
          _context.Session.Remove(old_session);
          _context.SaveChanges();
          if (new Random().Next(100) < 10) {
            var now = DateTime.Now;
            var to_remove = _context.Session.Where(s => now - s.CreatedAt > TimeSpan.FromDays(365)).ToList();
            _context.Session.RemoveRange(to_remove);
            _context.SaveChanges();
          }
        }
        HttpContext.Response.Cookies.Delete("SimpleModelsAndRelationsContext");
      }
    }
  }
}

namespace SimpleModelsAndRelations.Models
{
  public partial class RegistrationData
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public string EmailConfirmation { get; set; }
    public bool Errors { get; set; }
  }

  public partial class LoginData
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public bool Errors { get; set; }
  }

  public partial class ChangePasswordData
  {
    public string Username { get; set; }
    public string Password { get; set; }
    public string NewPassword { get; set; }
    public string NewPasswordConfirmation { get; set; }
    public bool Errors { get; set; }
  }

  public partial class ResetPasswordData
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public bool Errors { get; set; }
  }

  public partial class PasswordAndSalt {
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
  }

  public static class PasswordHasher {
    static public string RandomPassword {
      get {
        byte[] salt = new byte[64 / 8];
        using (var rng = RandomNumberGenerator.Create())
        {
          rng.GetBytes(salt);
        }
        return Convert.ToBase64String(salt);
      }
    }

    static public bool CheckHash(string password_to_test, PasswordAndSalt password) {
      string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
          password: password_to_test,
          salt: Convert.FromBase64String(password.PasswordSalt),
          prf: KeyDerivationPrf.HMACSHA1,
          iterationCount: 10000,
          numBytesRequested: 256 / 8));

      return hashed == password.PasswordHash;
    }

    static public PasswordAndSalt Hash(string password) {
      byte[] salt = new byte[128 / 8];
      using (var rng = RandomNumberGenerator.Create())
      {
          rng.GetBytes(salt);
      }

      // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
      string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
          password: password,
          salt: salt,
          prf: KeyDerivationPrf.HMACSHA1,
          iterationCount: 10000,
          numBytesRequested: 256 / 8));
      return new PasswordAndSalt() { PasswordHash = hashed, PasswordSalt = Convert.ToBase64String(salt) };
    }
  }
}

