using CRUDApi.Context;
using Microsoft.AspNetCore.Mvc;

namespace CRUDApi.Controllers
{
    public class AjaxController : Controller
    {
        private readonly ProductDBContext context;

        public AjaxController(ProductDBContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ProductList()
        {
            var data = context.ProductMaster.ToList();

            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult AddProduct(ProductMaster product)
        {
            var pm = new ProductMaster()
            {
                Name = product.Name,
                Price = product.Price,
                Quantity = product.Quantity,
                Active = product.Active
            };
            context.ProductMaster.Add(pm);
            context.SaveChanges();
            return new JsonResult("saved");
        }

        public JsonResult Delete(int id)
        {
            var data = context.ProductMaster.Where(e => e.Id == id).SingleOrDefault();
            context.ProductMaster.Remove(data);
            context.SaveChanges();
            return new JsonResult("deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = context.ProductMaster.Where(e=>e.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }


        [HttpPost]
        public JsonResult Update(ProductMaster productMaster)
        {
            context.ProductMaster.Update(productMaster);
            context.SaveChanges();
            return new JsonResult("Updated");
        }
    }



 
}
