using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersProject.Models;

namespace UsersProject.Repositories
{
    public interface ISalonUsersQueueRepository
    {
        Task<List<SalonUsersQueue>> GetSalonUsers(DateTime currenTime);
        Task<int> AddSalonUser(SalonUser salonUser);
        Task<int> AddUserToQueue(SalonQueue salonQueue);
        Task<int> UpdateUserInQueue(SalonQueue salonQueue);
        Task<int> RemoveUserFromQueue(int salonUserId);
        Task<SalonUser> CheckSalonUser(string userName, string userPwd);
    }
}
