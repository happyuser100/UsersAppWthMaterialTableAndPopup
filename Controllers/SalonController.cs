using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UsersProject.Models;
using UsersProject.Repositories;

namespace UsersProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonController : ControllerBase
    {
        private readonly ISalonUsersQueueRepository _salonUsersQueueRepo;

        public SalonController(ISalonUsersQueueRepository salonUsersQueueRepo)
        {
            _salonUsersQueueRepo = salonUsersQueueRepo;
        }

        [HttpGet]
        [Route("Test")]
        public string Test()
        {
            return "Hello";
        }

        [HttpGet]
        [Route("GetSalonUsers/{currenTime}")]
        public async Task<ActionResult<List<SalonUsersQueue>>> GetSalonUsers(DateTime currenTime)
        {
            return await _salonUsersQueueRepo.GetSalonUsers(currenTime);
        }

        [HttpPost]
        [Route("AddSalonUser")]
        public async Task<ActionResult<int>> AddSalonUser([FromBody] SalonUser salonUser)
        {
            return await _salonUsersQueueRepo.AddSalonUser(salonUser);
        }

        [HttpPost]
        [Route("AddUserToQueue")]
        public async Task<ActionResult<int>> AddUserToQueue([FromBody] SalonQueue salonQueue)
        {
            return await _salonUsersQueueRepo.AddUserToQueue(salonQueue);
        }

        [HttpPut]
        [Route("UpdateUserInQueue/{salonQueueId}")]
        public async Task<ActionResult<int>> UpdateUserInQueue(int salonQueueId, [FromBody] SalonQueue salonQueue)
        {
            salonQueue.SalonQueueId = salonQueueId;
            return await _salonUsersQueueRepo.UpdateUserInQueue(salonQueue);
        }

        [HttpDelete]
        [Route("RemoveUserFromQueue/{salonUserId}")]
        public async Task<ActionResult<int>> RemoveUserFromQueue(int salonUserId)
        {
            return await _salonUsersQueueRepo.RemoveUserFromQueue(salonUserId);
        }

        [HttpGet]
        [Route("CheckSalonUser/{userName}/{userPwd}")]
        public async Task<ActionResult<SalonUser>> CheckSalonUser(string userName, string userPwd)
        {
            return await _salonUsersQueueRepo.CheckSalonUser(userName, userPwd);
        }



    }
}
