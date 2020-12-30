USE [DogSalon]
GO
/****** Object:  Table [dbo].[SalonQueue]    Script Date: 27-Dec-20 2:49:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SalonQueue](
	[SalonQueueId] [int] IDENTITY(1,1) NOT NULL,
	[SalonUserId] [int] NOT NULL,
	[ArriveTime] [datetime] NOT NULL,
 CONSTRAINT [PK_SalonQueue] PRIMARY KEY CLUSTERED 
(
	[SalonQueueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SalonUsers]    Script Date: 27-Dec-20 2:49:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SalonUsers](
	[SalonUserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[UserPwd] [nvarchar](50) NOT NULL,
	[UserFirstName] [nvarchar](50) NOT NULL,
	[CreatedTime] [datetime] NOT NULL CONSTRAINT [DF_SalonUsers_CreatedTime]  DEFAULT (getdate()),
 CONSTRAINT [PK_SalonUsers] PRIMARY KEY CLUSTERED 
(
	[SalonUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[SalonQueue] ON 

INSERT [dbo].[SalonQueue] ([SalonQueueId], [SalonUserId], [ArriveTime]) VALUES (2, 1, CAST(N'2020-12-25 20:55:00.000' AS DateTime))
INSERT [dbo].[SalonQueue] ([SalonQueueId], [SalonUserId], [ArriveTime]) VALUES (3, 2, CAST(N'2020-12-26 10:10:00.000' AS DateTime))
INSERT [dbo].[SalonQueue] ([SalonQueueId], [SalonUserId], [ArriveTime]) VALUES (4, 3, CAST(N'2020-12-26 20:50:00.000' AS DateTime))
INSERT [dbo].[SalonQueue] ([SalonQueueId], [SalonUserId], [ArriveTime]) VALUES (5, 4, CAST(N'2020-12-27 15:19:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[SalonQueue] OFF
SET IDENTITY_INSERT [dbo].[SalonUsers] ON 

INSERT [dbo].[SalonUsers] ([SalonUserId], [UserName], [UserPwd], [UserFirstName], [CreatedTime]) VALUES (1, N'user1', N'1', N'1', CAST(N'2020-12-25 19:17:34.100' AS DateTime))
INSERT [dbo].[SalonUsers] ([SalonUserId], [UserName], [UserPwd], [UserFirstName], [CreatedTime]) VALUES (2, N'user2', N'2', N'2', CAST(N'2020-12-26 20:05:28.097' AS DateTime))
INSERT [dbo].[SalonUsers] ([SalonUserId], [UserName], [UserPwd], [UserFirstName], [CreatedTime]) VALUES (3, N'user3', N'3', N'Test', CAST(N'2020-12-27 01:03:58.200' AS DateTime))
INSERT [dbo].[SalonUsers] ([SalonUserId], [UserName], [UserPwd], [UserFirstName], [CreatedTime]) VALUES (4, N'user4', N'4', N'Check', CAST(N'2020-12-27 01:14:16.940' AS DateTime))
INSERT [dbo].[SalonUsers] ([SalonUserId], [UserName], [UserPwd], [UserFirstName], [CreatedTime]) VALUES (5, N'user5', N'5', N'Shlomo', CAST(N'2020-12-27 12:21:13.777' AS DateTime))
INSERT [dbo].[SalonUsers] ([SalonUserId], [UserName], [UserPwd], [UserFirstName], [CreatedTime]) VALUES (6, N'user6', N'6', N'aaaa', CAST(N'2020-12-27 12:29:09.627' AS DateTime))
INSERT [dbo].[SalonUsers] ([SalonUserId], [UserName], [UserPwd], [UserFirstName], [CreatedTime]) VALUES (7, N'user7', N'7', N'7', CAST(N'2020-12-27 12:31:27.140' AS DateTime))
SET IDENTITY_INSERT [dbo].[SalonUsers] OFF
ALTER TABLE [dbo].[SalonQueue]  WITH CHECK ADD  CONSTRAINT [FK_SalonQueue_SalonUsers] FOREIGN KEY([SalonUserId])
REFERENCES [dbo].[SalonUsers] ([SalonUserId])
GO
ALTER TABLE [dbo].[SalonQueue] CHECK CONSTRAINT [FK_SalonQueue_SalonUsers]
GO
/****** Object:  StoredProcedure [dbo].[AddSalonUser]    Script Date: 27-Dec-20 2:49:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddSalonUser]
  @UserName nvarchar(50),
  @UserPwd nvarchar(50),
  @UserFirstName nvarchar(50),
  @SalonUserId int OUTPUT
AS
BEGIN
  SET NOCOUNT ON

  INSERT INTO [SalonUsers]
           ([UserName],[UserPwd],[UserFirstName])
     VALUES
           (@UserName,@UserPwd,@UserFirstName)

  SET @SalonUserId = @@IDENTITY
END





GO
/****** Object:  StoredProcedure [dbo].[AddUserToQueue]    Script Date: 27-Dec-20 2:49:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddUserToQueue]
  @SalonUserId int,
  @ArriveTime datetime
AS
BEGIN
   SET NOCOUNT ON

      --IF NOT EXISTS ( SELECT [SalonUserId]  FROM [dbo].[SalonQueue] WHERE [SalonUserId] =  @SalonUserId)
     
      DELETE FROM [SalonQueue]
      WHERE [SalonUserId] = @SalonUserId 

     INSERT INTO [SalonQueue]
           ([SalonUserId],[ArriveTime])
     VALUES
           (@SalonUserId,@ArriveTime)
END

GO
/****** Object:  StoredProcedure [dbo].[CheckSalonUser]    Script Date: 27-Dec-20 2:49:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CheckSalonUser]
  @UserName nvarchar(50),
  @UserPwd nvarchar(50)
AS
BEGIN
  SET NOCOUNT ON
  SELECT [SalonUserId] ,[UserName],[UserPwd],[UserFirstName],[CreatedTime]
  FROM [SalonUsers]
  WHERE [UserName] = @UserName AND [UserPwd] = @UserPwd
END
GO
/****** Object:  StoredProcedure [dbo].[GetSalonUsers]    Script Date: 27-Dec-20 2:49:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetSalonUsers]
  @CurrenTime datetime
AS
BEGIN
   SET NOCOUNT ON
   SELECT SalonUsers.SalonUserId, SalonUsers.UserName, SalonUsers.UserFirstName, 
         SalonUsers.CreatedTime, SalonQueue.SalonQueueId,SalonQueue.ArriveTime
   FROM   SalonUsers INNER JOIN
      SalonQueue ON SalonUsers.SalonUserId = SalonQueue.SalonUserId
   WHERE SalonQueue.ArriveTime > @CurrenTime 
END

GO
/****** Object:  StoredProcedure [dbo].[RemoveUserFromQueue]    Script Date: 27-Dec-20 2:49:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RemoveUserFromQueue]
  @SalonUserId int
AS
BEGIN
    SET NOCOUNT ON
    DELETE FROM [dbo].[SalonQueue]
    WHERE [SalonUserId] = @SalonUserId 
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateUserInQueue]    Script Date: 27-Dec-20 2:49:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateUserInQueue]
  @SalonUserId int,
  @ArriveTime datetime
AS
BEGIN
   SET NOCOUNT ON
   UPDATE [SalonQueue]
   SET [ArriveTime] = @ArriveTime
   WHERE [SalonUserId] = @SalonUserId 
END

GO
