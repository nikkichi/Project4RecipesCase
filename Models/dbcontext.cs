using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SimpleModelsAndRelations.Models{
  public partial class SimpleModelsAndRelationsContext : DbContext {

      public SimpleModelsAndRelationsContext(DbContextOptions<SimpleModelsAndRelationsContext> options) : base(options){}
  }
}
