using CRUDApi.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace CRUDApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDBContext context;

        public ProductController(ProductDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<ProductMaster> Get()
        {
            return context.ProductMaster.ToList();
        }

        [HttpGet("{id}")]
        public ProductMaster Edit(int id)
        {
            ProductMaster prod = context.ProductMaster.Find(id);
            return prod;
        }

        [HttpPost]
        public string Post(ProductMaster prod)
        {
            context.ProductMaster.Add(prod);
            context.SaveChanges();
            return "Product added";
        }

        [HttpPut("{id}")]
        public string Put(int id, ProductMaster prod)
        {
            var prodoc = context.ProductMaster.Find(id);
            prodoc.Name = prod.Name;
            prodoc.Price = prod.Price;
            prodoc.Quantity = prod.Quantity;
            prodoc.Active = prod.Active;

            context.Entry(prodoc).State = EntityState.Modified;
            context.SaveChanges();

            return "updated..";

        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            var data = context.ProductMaster.Where(x => x.Id == id).SingleOrDefault();
            context.ProductMaster.Remove(data);
            context.SaveChanges();
            return "deleted..";
        }


    }
}
