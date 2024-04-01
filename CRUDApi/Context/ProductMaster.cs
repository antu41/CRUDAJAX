namespace CRUDApi.Context
{
    public class ProductMaster
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<int> Active { get; set; }
    }
}
