using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelloWebApi.Models
{
    [Table("items")]
    public class TodoItem
    {
        [Key]
        [Required]
        [Column("id")]
        
        public Guid Id { get; set; }

        [StringLength(255)]
        [Column("name")]
        public string Name { get; set; }

        [Column("is_complete")]
        public bool IsComplete { get; set; }

        [Timestamp]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("modified_at")]
        public DateTime ModifiedAt { get; set; }

        [Column("deleted_at")]
        public Nullable<DateTime> DeletedAt { get; set; }
    }
}
