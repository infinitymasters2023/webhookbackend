// USE [iapl]
// GO
// /****** Object:  StoredProcedure [dbo].[whatsApptemplatedatamanage]    Script Date: 9/28/2024 12:51:45 PM ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO

// ALTER PROCEDURE [dbo].[whatsApptemplatedatamanage]
//     @Id NVARCHAR(150) =null,
//     @Type NVARCHAR(255) =null,
//     @processtype NVARCHAR (255) = null,
//     @PhoneNumber NVARCHAR(50) =null,
//     @ContactId NVARCHAR(50)=null,
//     @Campaign NVARCHAR(255)=null,
//     @Sender NVARCHAR(255)=null,
//     @MessageContent_Text NVARCHAR(MAX) =null,
//     @MessageType NVARCHAR(50) =null,
//     @Status NVARCHAR(50) =null,
//     @IsHSM NVARCHAR(10) =null,
//     @ChatbotResponse NVARCHAR(MAX) =null,
//     @AgentId NVARCHAR(150) =null,
//     @SentAt NVARCHAR(150) =null,
//     @DeliveredAt NVARCHAR(150) =null,
//     @ReadAt NVARCHAR(150) =null,
//     @FailureResponse NVARCHAR(MAX) =null,
//     @UserName NVARCHAR(255) =null,
//     @CountryCode NVARCHAR(10) =null,
//     @SubmittedMessageId NVARCHAR(255)=null,
//     @MessagePrice NVARCHAR(150) =null,
//     @DeductionType NVARCHAR(50) =null,
//     @MauDetails NVARCHAR(MAX) =null,
//     @WhatsAppConversationDetails_Id NVARCHAR(150) =null,
//     @WhatsAppConversationDetails_Type NVARCHAR(50) =null,
//     @Context NVARCHAR(MAX) =null,
//     @MessageId NVARCHAR(255)=null,
//     @TemplateID INT = NULL, 
//     @TemplateName NVARCHAR(255)=Null,
//     @Language NVARCHAR(MAX) =null,
//     @TemplateType NVARCHAR(50)=null,
//     @TemplateCategory NVARCHAR(50)=null,
//     @HeaderType NVARCHAR(50)=null,
//     @HeaderText NVARCHAR(MAX)=null,
//     @BodyText NVARCHAR(MAX)=null,
//     @BodyExample NVARCHAR(MAX)=null,
//     @FooterText NVARCHAR(MAX)=null,
//     @ButtonsType NVARCHAR(50)=null,
//     @ButtonLabel NVARCHAR(255)=null,
//     @ButtonType NVARCHAR(50)=null,
//     @ButtonWebsite NVARCHAR(MAX)=null,
// 	@contactpersonmobileno VARCHAR(15) = NULL,
//     @buttonwebtype NVARCHAR(50)=null,
// 	@Approve BIT = NULL,
// 	@mobileno VARCHAR(13) = NULL,
// 	@otp VARCHAR(6) = NULL,
// 	 @role VARCHAR(25)=Null,
// 	 @isDeleted BIT = Null,
//     @CreatedDate DATETIME = NULL,
//     @MessageContent_Caption NVARCHAR(MAX) = NULL,
//     @MessageContent_Url NVARCHAR(MAX) = NULL,
//     @MessageContent_UrlExpiry NVARCHAR(MAX) = NULL,
//     @ActionStatus NVARCHAR(200) = NULL,
//     @ActionDate DATETIME = NULL,
//     @ActionBy NVARCHAR(256) = NULL
// AS
// BEGIN
//     SET NOCOUNT ON;

//     IF (@processtype = '1') 
//     BEGIN
//         INSERT INTO smartpingMessagesalldata (
//             [Id], [Type], [PhoneNumber], [ContactId], [Campaign], [Sender],
//             [MessageContent_Text], [MessageType], [Status], [IsHSM], [ChatbotResponse],
//             [AgentId], [SentAt], [DeliveredAt], [ReadAt], [FailureResponse],
//             [UserName], [CountryCode], [SubmittedMessageId], [MessagePrice],
//             [DeductionType], [MauDetails], [WhatsAppConversationDetails_Id],
//             [WhatsAppConversationDetails_Type], [Context], [MessageId]
//         )
//         VALUES (
//             @Id, @Type, @PhoneNumber, @ContactId, @Campaign, @Sender,
//             @MessageContent_Text, @MessageType, @Status, @IsHSM, @ChatbotResponse,
//             @AgentId, @SentAt, @DeliveredAt, @ReadAt, @FailureResponse,
//             @UserName, @CountryCode, @SubmittedMessageId, @MessagePrice,
//             @DeductionType, @MauDetails, @WhatsAppConversationDetails_Id,
//             @WhatsAppConversationDetails_Type, @Context, @MessageId
//         );
//     END

//     IF (@processtype = '2') 
//     BEGIN
//         SELECT name, phonecode FROM IAPL_Country_Code;
//     END

//     IF (@processtype = '3') 
//     BEGIN
//         INSERT INTO CreateTemplate (
//             TemplateID,
//             TemplateName,
//             Language,
//             TemplateType,
//             TemplateCategory,
//             HeaderType,
//             HeaderText,
//             BodyText,
//             [BodyExample],
//             FooterText,
//             ButtonsType,
//             ButtonLabel,
//             buttonwebtype,
//             ButtonWebsite,
// 			Approve
//         )
//         VALUES (
//             @TemplateID,
//             @TemplateName,
//             @Language,
//             @TemplateType,
//             @TemplateCategory,
//             @HeaderType,
//             @HeaderText,
//             @BodyText,
//             @BodyExample,
//             @FooterText,
//             @ButtonsType,
//             @ButtonLabel,
//             @buttonwebtype,
//             @ButtonWebsite,
// 			@Approve
//         );
//     END
// 	  IF (@processtype = '4') 
//     BEGIN
// 	select * from CreateTemplate where TemplateName=@TemplateName
// 	END
// 	  IF (@processtype = '5') 
//     BEGIN
// 	select * from CreateTemplate 
// 	END

// IF (@processtype = '6') 
// BEGIN
//     INSERT INTO whatsAppUserslogin(
//         mobileno,
//         otp,
//         role
//     )
//     VALUES (
//         @mobileno,
//         @otp,
//         CASE 
//             WHEN @mobileno = '9999914451' THEN 'admin' 
//             ELSE 'user' 
//         END
//     );
// END;

// IF (@processtype = '7') 
// BEGIN
//     UPDATE whatsAppUserslogin 
//     SET otp = @otp,
//         role = CASE 
//                   WHEN @mobileno = '9999914451' THEN 'admin' 
//                   ELSE 'user' 
//                END
//     WHERE mobileno = @mobileno;
// END;
// IF (@processtype = '8') 
// BEGIN
//     UPDATE CreateTemplate
//     SET isDeleted = 1
//     WHERE TemplateName=@TemplateName 
// END

//  IF (@processtype = '9') 
//     BEGIN
//     -- Insert the data into the table
//     INSERT INTO [dbo].[Iapl_crm_smartping_whatsappwebhook]
//     (
//         [Id],
//         [Type],
//         [PhoneNumber],
//         [ContactId],
//         [Campaign],
//         [Sender],
//         [MessageContent_Text],
//         [MessageType],
//         [Status],
//         [IsHSM],
//         [ChatbotResponse],
//         [AgentId],
//         [SentAt],
//         [DeliveredAt],
//         [ReadAt],
//         [FailureResponse],
//         [UserName],
//         [CountryCode],
//         [SubmittedMessageId],
//         [MessagePrice],
//         [DeductionType],
//         [MauDetails],
//         [WhatsAppConversationDetails_Id],
//         [WhatsAppConversationDetails_Type],
//         [Context],
//         [MessageId],
//         [CreatedDate],
//         [MessageContent_Caption],
//         [MessageContent_Url],
//         [MessageContent_UrlExpiry],
//         [ActionStatus],
//         [ActionDate],
//         [ActionBy]
//     )
//     VALUES
//     (
//         @Id,
//         @Type,
//         @PhoneNumber,
//         @ContactId,
//         @Campaign,
//         @Sender,
//         @MessageContent_Text,
//         @MessageType,
//         @Status,
//         @IsHSM,
//         @ChatbotResponse,
//         @AgentId,
//         @SentAt,
//         @DeliveredAt,
//         @ReadAt,
//         @FailureResponse,
//         @UserName,
//         @CountryCode,
//         @SubmittedMessageId,
//         @MessagePrice,
//         @DeductionType,
//         @MauDetails,
//         @WhatsAppConversationDetails_Id,
//         @WhatsAppConversationDetails_Type,
//         @Context,
//         @MessageId,
//         @CreatedDate,
//         @MessageContent_Caption,
//         @MessageContent_Url,
//         @MessageContent_UrlExpiry,
//         @ActionStatus,
//         @ActionDate,
//         @ActionBy
//     );
// END;

// END;
