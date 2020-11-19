using System.Linq;

namespace TasklyNetWebApi.Extensios
{
    public static class IEnumerableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> items, int page, int take)
        {
            if (take == 0) take = 5;

            int skip;
            if (page == 0)
                skip = 0;
            else
                skip = page * take;

            return items.Skip(skip).Take((int)take);
        }
    }
}
