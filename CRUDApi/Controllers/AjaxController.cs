using CRUDApi.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

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

        //[HttpGet]
        //public JsonResult ProductList()
        //{
        //    var data = context.ProductMaster.ToList();

        //    return new JsonResult(data);
        //}

        //[HttpGet]
        //public IActionResult ProductList()
        //{
        //    var data = context.ProductMaster.ToList();
        //    return Ok(data);
        //}

        [HttpGet]
        public IActionResult ProductList()
        {
            var data = context.ProductMaster.ToList();

            // Calculate total number of records
            int totalCount = context.ProductMaster.Count();

            // Calculate total number of pages
            int last_page = (int)Math.Ceiling((double)totalCount / 10);


            // Return the instance of ProductListResponse class
            return Json (new {last_page, data});
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











    //[AllowAnonymous]
    //[HttpGet]
    //public IActionResult GetInvoiceList1(string status, string duration, int customerId, int page = 1, decimal size = 10, string searchquery = "")  //It's Required
    //{
    //    try
    //    {
    //        var ComId = HttpContext.Session.GetInt32("ComId");
    //        var salesId = 0;

    //        SqlParameter[] sqlParameter1 = new SqlParameter[3];
    //        sqlParameter1[0] = new SqlParameter("@ComId", ComId);
    //        sqlParameter1[1] = new SqlParameter("@SalesId", salesId);
    //        sqlParameter1[2] = new SqlParameter("@CustomerId", customerId);
    //        Helper.ExecProc("[SalesStatusUpdate]", sqlParameter1);

    //        var salelist = saleRepository.All();

    //        if (searchquery?.Length > 1)
    //        {
    //            salelist = salelist.Where(x =>
    //            x.DocTypeList.DocType.ToLower().Contains(searchquery.ToLower()) ||
    //            x.SaleCode.ToLower().Contains(searchquery.ToLower()) ||
    //            x.CustomerName.ToLower().Contains(searchquery.ToLower()) ||
    //            x.Total.ToString().ToLower().Contains(searchquery.ToLower())
    //       );

    //        }

    //        if (status != "0" && status != null)
    //        {
    //            salelist = salelist.Where(x => x.DocTypeId == int.Parse(status));
    //            //if (status == "Unpaid")
    //            //{

    //            //}
    //            //else if (status == "Paid")
    //            //{
    //            //    salelist = salelist.Where(x => x.Status == "paid");
    //            //}
    //        }

    //        if (!string.IsNullOrEmpty(duration))
    //        {
    //            DateTime startDate, endDate;

    //            if (duration == "Today")
    //            {
    //                startDate = DateTime.Today;
    //                endDate = DateTime.Today.AddDays(1);
    //            }
    //            else if (duration == "This month")
    //            {
    //                startDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
    //                endDate = startDate.AddMonths(1);
    //            }
    //            else if (duration == "Last month")
    //            {
    //                startDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1).AddMonths(-1);
    //                endDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
    //            }
    //            else if (duration == "Last year")
    //            {
    //                startDate = new DateTime(DateTime.Today.Year - 1, 1, 1);
    //                endDate = new DateTime(DateTime.Today.Year, 1, 1);
    //            }
    //            else if (duration == "This year")
    //            {
    //                startDate = new DateTime(DateTime.Today.Year, 1, 1);
    //                endDate = new DateTime(DateTime.Today.Year + 1, 1, 1);
    //            }
    //            else
    //            {
    //                // Handle other duration options if needed
    //                startDate = endDate = DateTime.MinValue;
    //            }

    //            salelist = salelist.Where(x => x.SalesDate >= startDate && x.SalesDate < endDate);
    //        }

    //        if (customerId > 0)
    //        {
    //            salelist = salelist.Where(x => x.CustomerId == customerId);
    //        }

    //        var data = salelist.Where(x => x.IsRecurring == false).Include(x => x.DocTypeList).Include(x => x.Items).OrderByDescending(x => x.Id);

    //        salelist = salelist.Where(x => x.IsRecurring == false);

    //        decimal TotalRecordCount = salelist.Count();
    //        var PageCountabc = decimal.Parse((TotalRecordCount / size).ToString());
    //        var PageCount = Math.Ceiling(PageCountabc);

    //        decimal skip = (page - 1) * size;


    //        var query = from e in salelist.Include(x => x.Items)
    //                    .ThenInclude(x => x.Product).ThenInclude(x => x.Category)
    //                    .Include(x => x.SalesPayments).ThenInclude(x => x.vChartofAccounts)
    //                    .Include(x => x.SalesPayments).ThenInclude(x => x.Transaction)
    //                    .Include(x => x.SalesReturn).ThenInclude(x => x.SalesReturnPayments)
    //                    .Include(x => x.DocTypeList)


    //                    select new
    //                    {
    //                        Id = e.Id,
    //                        SaleCodes = e.SaleCode,
    //                        SalesDates = e.SalesDate,
    //                        SalesDateString = e.SalesDate.ToString("dd-MMM-yy"),

    //                        SalesUser = e.UserAccountList.Name,

    //                        CustomerNames = (e.CustomerName.Length == 0 || e.CustomerName == null) ? e.CustomerModel.Name : e.CustomerName,
    //                        //CustomerName = e.CustomerName,
    //                        PrimaryAddress = e.PrimaryAddress,
    //                        SecoundaryAddress = e.SecoundaryAddress,
    //                        Notes = e.Notes,
    //                        PhoneNo = e.PhoneNo,
    //                        Discount = e.Discount,
    //                        e.IsDelete,
    //                        CustomerCommissionAmount = e.CustomerCommissionAmount,
    //                        SRCommissionAmount = e.SRCommissionAmount,



    //                        Totals = e.Total,
    //                        StatusRemarkss = e.StatusRemarks,
    //                        NetAmount = e.NetAmount,
    //                        ServiceCharge = e.ServiceCharge,
    //                        TotalVat = e.TotalVat,
    //                        Shipping = e.Shipping,
    //                        DocTypes = e.DocTypeList.DocType,
    //                        //TransactionCode = e.AccountTransaction.,



    //                        isPOSSales = e.isPOSSales,
    //                        isSerialSales = e.isSerialSales,
    //                        isPosted = e.isPosted,
    //                        FinalCostingPrice = e.FinalCostingPrice,
    //                        Profit = e.Profit,
    //                        ProfitPercentage = e.ProfitPercentage,
    //                        Location = e.Warehouses.WhShortName,
    //                        StatusPosted = e.isPosted != false ? "Posted" : "Not Posted",
    //                        PaidAmt = e.SalesPayments.Sum(x => x.Amount),// e.PaidAmt,
    //                                                                     //ReceivingHead = e.CreditAccount != null ? e.CreditAccount.AccName : "=N/A="
    //                                                                     //SalesPayments = e.SalesPayments.ToList(),
    //                        SalesReturnPayments = e.SalesReturn.FirstOrDefault().SalesReturnPayments.Sum(x => x.Amount),
    //                        SalesReturnAmount = e.SalesReturn.Sum(x => x.NetAmount),
    //                        SalesPayments = e.SalesPayments.Select(x => new
    //                        {
    //                            x.SalesId,
    //                            x.PaymentCardNo,
    //                            x.isPosted,
    //                            x.Amount,
    //                            x.RowNo,
    //                            x.AccountHeadId,
    //                            AccType = x.vChartofAccounts.AccType,
    //                            AccName = x.vChartofAccounts.AccName,
    //                            TransactionCode = x.Transaction.TransactionCode
    //                        }),
    //                        SalesItems = e.Items.Select(x => new
    //                        {
    //                            x.Id,
    //                            CategoryName = x.Product.Category.Name,
    //                            ProductCode = x.Product.Code,
    //                            ProductName = x.Product.Name,

    //                            BatchSerial = x.BatchSerialItems.Select(x => new
    //                            {
    //                                BatchSerialNo = x.PurchaseBatchItems.BatchSerialNo
    //                            }),

    //                            Price = Math.Round(x.Price, 4),
    //                            CostPrice = Math.Round(x.CostPrice, 4),
    //                            AvgCostPrice = Math.Round(x.AvgCostPrice, 4),
    //                            IndDiscountProportion = Math.Round(x.IndDiscountProportion, 4),
    //                            Quantity = x.Quantity,
    //                            //ProfitPer = x.profit,
    //                            CommissionAmount = x.CommissionAmount

    //                        })
    //                        //Items = e.Items
    //                    };



    //        var abcd = query.OrderByDescending(x => x.Id).Skip(int.Parse(skip.ToString())).Take(int.Parse(size.ToString())).ToList();
    //        var pageinfo = new PagingInfo();
    //        pageinfo.PageCount = int.Parse(PageCount.ToString());
    //        pageinfo.PageNo = page;
    //        pageinfo.PageSize = int.Parse(size.ToString());
    //        pageinfo.TotalRecordCount = int.Parse(TotalRecordCount.ToString());

    //        return Json(new { Success = 1, error = false, data = abcd, page = page, size = size, last_page = pageinfo.PageCount, total = pageinfo.TotalRecordCount });

    //        //return Json(new { Success = 1, data = data, ex = "Data " });
    //    }
    //    catch (Exception ex)
    //    {
    //        return Json(new { Success = 0, ex = ex.InnerException?.InnerException?.Message ?? ex.Message });
    //    }
    //}











}
