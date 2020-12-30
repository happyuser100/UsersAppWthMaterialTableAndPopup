using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using UsersProject.Models;

namespace UsersProject.Repositories
{
    public class SalonUsersQueueRepository: ISalonUsersQueueRepository
    {
        private readonly IConfiguration _config;

        public SalonUsersQueueRepository(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public async Task<List<SalonUsersQueue>> GetSalonUsers(DateTime currenTime)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[dbo].[GetSalonUsers] @CurrenTime";
                conn.Open();
                var result = await conn.QueryAsync<SalonUsersQueue>(sQuery, new { CurrenTime = currenTime });
                //foreach(SalonUsersQueue salonUsersQueue in result)
                //{
                //    //salonUsersQueue.ArriveTime = ConvToDate(salonUsersQueue.ArriveTime);
                //}
                return result.ToList();
            }
        }

         


        public async Task<int> AddSalonUser(SalonUser salonUser)
        {
            var retVal = 0;
            using (IDbConnection conn = Connection)
            {
                DynamicParameters _params = new DynamicParameters();
                _params.Add("@UserName", salonUser.UserName, DbType.String, direction: ParameterDirection.Input, 50);
                _params.Add("@UserPwd", salonUser.UserPwd, DbType.String, direction: ParameterDirection.Input, 50);
                _params.Add("@UserFirstName", salonUser.UserFirstName, DbType.String, direction: ParameterDirection.Input, 50);
                _params.Add("@SalonUserId", DbType.Int32, direction: ParameterDirection.Output);
                var result = await conn.ExecuteAsync("[dbo].AddSalonUser", _params, null, null, CommandType.StoredProcedure).ConfigureAwait(false);
                retVal = _params.Get<int>("SalonUserId");
            }
            return retVal;
        }

        public async Task<int> AddUserToQueue(SalonQueue salonQueue)
        {
            var retVal = 0;
            using (IDbConnection conn = Connection)
            {
                DynamicParameters _params = new DynamicParameters();
                _params.Add("@SalonUserId", salonQueue.SalonUserId, DbType.Int32, direction: ParameterDirection.Input);
                _params.Add("@ArriveTime", salonQueue.ArriveTime, DbType.DateTime, direction: ParameterDirection.Input, 50);
                var result = await conn.ExecuteAsync("[dbo].AddUserToQueue", _params, null, null, CommandType.StoredProcedure).ConfigureAwait(false);
            }
            return retVal;
        }

        public async Task<int> UpdateUserInQueue(SalonQueue salonQueue)
        {
            var retVal = 0;
            using (IDbConnection conn = Connection)
            {
                DynamicParameters _params = new DynamicParameters();
                _params.Add("@SalonUserId", salonQueue.SalonUserId, DbType.Int32, direction: ParameterDirection.Input);
                _params.Add("@ArriveTime", salonQueue.ArriveTime, DbType.DateTime, direction: ParameterDirection.Input, 50);
                var result = await conn.ExecuteAsync("[dbo].UpdateUserInQueue", _params, null, null, CommandType.StoredProcedure).ConfigureAwait(false);
            }
            return retVal;
        }

        public async Task<int> RemoveUserFromQueue(int salonUserId)
        {
            var retVal = 0;
            using (IDbConnection conn = Connection)
            {
                DynamicParameters _params = new DynamicParameters();
                _params.Add("@SalonUserId", salonUserId, DbType.Int32, direction: ParameterDirection.Input);
                var result = await conn.ExecuteAsync("[dbo].RemoveUserFromQueue", _params, null, null, CommandType.StoredProcedure).ConfigureAwait(false);
            }
            return retVal;
        }

        public async Task<SalonUser> CheckSalonUser(string userName, string userPwd)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[dbo].[CheckSalonUser] @UserName,@UserPwd";
                conn.Open();
                var result = await conn.QueryFirstOrDefaultAsync<SalonUser>(sQuery,
                    new { UserName = userName, UserPwd = userPwd });
                return result;
            }
        }

    }
}
