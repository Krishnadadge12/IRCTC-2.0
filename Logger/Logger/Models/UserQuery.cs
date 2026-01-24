using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Logger.Models
{
    [Table("UserQuery")]
    public class UserQuery
    {
        [Key]
        public int Id { get; set; }
        public string QueryText { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
