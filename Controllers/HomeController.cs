using System;
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


namespace SimpleModelsAndRelations.Controllers
{
  public class HomeController : Controller
  {
    private readonly MailOptions _mailOptions;
    private readonly SimpleModelsAndRelationsContext _context;

    public HomeController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    [Route("")]
    [HttpGet("Home")]
    [HttpGet("Home/Index")]
    public IActionResult Index()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);


      ViewData["id"] = _context.Homepage.First().Id;

      ViewData["Page"] = "Home/Index";
      return View();
    }

    [HttpGet("Home/Error")]
    public IActionResult Error()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);


      ViewData["Page"] = "Home/Error";
      return View();
    }

    [HttpGet("Home/Unauthorised")]
    public IActionResult Unauthorised()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);


      ViewData["Page"] = "Home/Unauthorised";
      return View();
    }
  }
}
