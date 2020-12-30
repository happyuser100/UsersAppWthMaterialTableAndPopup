using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersProject.Models
{
    public class SalonQueue
    {
        public int SalonQueueId { get; set; }
        public int SalonUserId { get; set; }
        public DateTime ArriveTime { get; set; }
    }
}
