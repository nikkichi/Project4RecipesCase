using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using SimpleModelsAndRelations;
using SimpleModelsAndRelations.Models;
using SimpleModelsAndRelations.Filters;
using System.IO;

[Route("api/v1/keep_alive")]
public class KeepAliveApiController : Controller
{
  private readonly MailOptions _mailOptions;
  public readonly SimpleModelsAndRelationsContext _context;

  public KeepAliveApiController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
  {
    _context = context;
    _mailOptions = mailOptionsAccessor.Value;
  }

  [HttpGet("ping")]
  [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
  public IActionResult Ping() {
    return Ok();
  }
  [HttpGet("ping_as_User")]
  [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
  public IActionResult PingAsUser() {
    var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
    if (current_User != null)
      return Ok();
    else
      return NotFound();
  }

}
