using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasklyNetShared.Models
{
    public class Category
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(120)]
        public string Description { get; set; }

        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
