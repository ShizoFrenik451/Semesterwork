using SemesterWorkKino.Models;
using Microsoft.EntityFrameworkCore;

namespace SemesterWorkKino
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}