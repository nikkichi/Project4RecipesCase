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
    [Route("customcontroller")]
  public class CustomController : Controller
  {
    private readonly MailOptions _mailOptions;
    private readonly SimpleModelsAndRelationsContext _context;

    public CustomController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }
    [HttpGet("getrating/{id_user}")]
    public int [] get_rating(int id_user){ 
        //_context.
        _context.SaveChanges
        //linq
        return new int[]{99,11,3};
    }
  }
}