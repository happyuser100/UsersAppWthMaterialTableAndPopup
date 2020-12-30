using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersProject.Models
{
    public class SalonUser
    {
        public int SalonUserId { get; set; }
        public string UserName { get; set; }
        public string UserPwd { get; set; }
        public string UserFirstName { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}
