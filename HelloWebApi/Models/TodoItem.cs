﻿using System;
using System.ComponentModel.DataAnnotations;

namespace HelloWebApi.Models
{
    public class TodoItem
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        public bool IsComplete { get; set; }

        [Timestamp]
        public DateTime CreatedAt { get; set; }

        public DateTime ModifiedAt { get; set; }

        public DateTime DeletedAt { get; set; }
    }
}
