namespace TasklyNetWebApi.Dto
{
    public class PaginateDto
    {
        public int Total { get; set; }
        public int Page { get; set; }
        public object Records { get; set; }
    }
}
