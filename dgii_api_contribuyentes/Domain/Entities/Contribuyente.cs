using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Contribuyente : AuditableBaseEntity
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string RncCedula { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Numberphone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

    }
}
