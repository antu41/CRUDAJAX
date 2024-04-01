using Microsoft.EntityFrameworkCore;

namespace CRUDApi.Context
{
    public class ProductDBContext : DbContext 
    {    
        public ProductDBContext(DbContextOptions options) : base(options)
            {
            } 
        public DbSet<ProductMaster> ProductMaster { get; set; }
    }

}
