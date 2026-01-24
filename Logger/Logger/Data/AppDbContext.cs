using Logger.Models;
using Microsoft.EntityFrameworkCore;

namespace Logger.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserQuery> UserQueries { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {
        }
    }
}
