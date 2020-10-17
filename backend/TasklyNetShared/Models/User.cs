using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TasklyNetShared.Models
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(120)]
        public string Name { get; set; }

        [Required]
        [MaxLength(120)]
        public string Email { get; set; }

        [Required]
        [MaxLength(30)]
        public string Password { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}
