using System.Collections.Generic;

namespace TasklyNetWebApi.Dto
{
    public class DataTableParameterDto
    {
        public int Page { get; set; }

        public int? Take { get; set; }

        public string GlobalFilter { get; set; }

        public Dictionary<string, string> Filters { get; set; }

        private string _sort;

        public string Sort
        {
            get => _sort;
            set => _sort = value.ToLower();
        }

        public bool Desc { get; set; }
    }
}
