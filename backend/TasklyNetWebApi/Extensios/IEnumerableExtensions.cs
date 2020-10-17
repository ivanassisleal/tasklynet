using System.Linq;

namespace TasklyNetWebApi.Extensios
{
    public static class IEnumerableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> items, int page, int? take)
        {
            int skip = 0;

            if (page == 0)
            {
                page = 1;
                skip = 0;
            }
            else if (take != null)
                skip = page * (int)take;

            if (take != null)
                return items.Skip(skip).Take((int)take);
            else
                return items;
        }
    }
}
