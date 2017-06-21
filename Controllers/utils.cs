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

namespace SimpleModelsAndRelations
{
  public interface IEntity {
    DateTime CreatedDate {get;}
    int Id {get;}
  }

  public class ItemWithEditable<T> {
    public T Item {get;set;}
    public bool Editable {get;set;}
  }

  public class Container<T> {
    public T Content {get;set;}
  }


  static public class QueryableExtensions {
    static public Page<T> Paginate<T, U>(this IQueryable<Tuple<U, bool>> self, bool can_create, bool can_delete, bool can_link, int page_index, int page_size, Func<U,U> g, Func<U,T> f) where U : IEntity {
      var count = self.Count();
      var num_pages = count / page_size + (count % page_size > 0 ? 1 : 0);
      var now = DateTime.Now;
      // var just_created = self.Where(u => (now - u.Item1.CreatedDate).Seconds <= 20).ToList();
      // var items = self.Where(u => (now - u.Item1.CreatedDate).Seconds > 20).Skip(page_index * page_size).Take(page_size).ToList().Concat(just_created).Select(u => Tuple.Create(g(u.Item1), u.Item2)).Select(u => new ItemWithEditable<T>(){ Item = f(u.Item1), Editable = u.Item2}).ToList();
      var items = self.Skip(page_index * page_size).Take(page_size).Select(u => Tuple.Create(g(u.Item1), u.Item2)).Select(u => new ItemWithEditable<T>(){ Item = f(u.Item1), Editable = u.Item2}).ToList();
      return new Page<T>() {
        Items = items,
        PageIndex = page_index,
        NumPages = num_pages,
        PageSize = page_size,
        TotalCount = self.Count(),
        CanCreate = can_create,
        CanDelete = can_delete,
        CanLink = can_link
      };
    }
  }

  public class Page<T> {
    public IEnumerable<ItemWithEditable<T>> Items {get;set;}
    public int PageIndex {get;set;}
    public int NumPages {get;set;}
    public int PageSize {get;set;}
    public int TotalCount {get;set;}
    public bool CanDelete {get;set;}
    public bool CanCreate {get;set;}
    public bool CanLink {get;set;}
  }
}
