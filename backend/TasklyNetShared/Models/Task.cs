using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasklyNetShared.Models
{
    public class Task
    {
        
        public Guid Id { get; set; }

        [Required]
        [MaxLength(120)]
        public string Title { get; set; }

        [MaxLength(400)]
        public string Description { get; set; }

        public bool Done { get; set; }

        public Guid ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public Project Project { get; set; }

        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
