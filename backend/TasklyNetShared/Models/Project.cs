using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasklyNetShared.Models
{
    public class Project
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(120)]
        public string Title { get; set; }

        [MaxLength(400)]
        public string Description { get; set; }

        [MaxLength(30)]
        public string Type { get; set; }

        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public bool Active { get; set; }

        public ICollection<Task> Tasks { get; set; }
    }
}
