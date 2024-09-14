/* eslint-disable prettier/prettier */
// CREATE PROCEDURE smartpingInsertMessageData
//     @Id NVARCHAR(150),
//     @Type NVARCHAR(255),
//     @PhoneNumber NVARCHAR(50),
//     @ContactId NVARCHAR(50),
//     @Campaign NVARCHAR(255),
//     @Sender NVARCHAR(255),
//     @MessageContent_Text NVARCHAR(MAX),
//     @MessageType NVARCHAR(50),
//     @Status NVARCHAR(50),
//     @IsHSM NVARCHAR(10),
//     @ChatbotResponse NVARCHAR(MAX),
//     @AgentId NVARCHAR(150),
//     @SentAt NVARCHAR(150),
//     @DeliveredAt NVARCHAR(150),
//     @ReadAt NVARCHAR(150),
//     @FailureResponse NVARCHAR(MAX),
//     @UserName NVARCHAR(255),
//     @CountryCode NVARCHAR(10),
//     @SubmittedMessageId NVARCHAR(255),
//     @MessagePrice NVARCHAR(150),
//     @DeductionType NVARCHAR(50),
//     @MauDetails NVARCHAR(MAX),
//     @WhatsAppConversationDetails_Id NVARCHAR(150),
//     @WhatsAppConversationDetails_Type NVARCHAR(50),
//     @Context NVARCHAR(MAX),
//     @MessageId NVARCHAR(255)
// AS
// BEGIN
//     INSERT INTO smartpingMessagesalldata (
//         [Id], [Type], [PhoneNumber], [ContactId], [Campaign], [Sender],
//         [MessageContent_Text], [MessageType], [Status], [IsHSM], [ChatbotResponse],
//         [AgentId], [SentAt], [DeliveredAt], [ReadAt], [FailureResponse],
//         [UserName], [CountryCode], [SubmittedMessageId], [MessagePrice],
//         [DeductionType], [MauDetails], [WhatsAppConversationDetails_Id],
//         [WhatsAppConversationDetails_Type], [Context], [MessageId]
//     )
//     VALUES (
//         @Id, @Type, @PhoneNumber, @ContactId, @Campaign, @Sender,
//         @MessageContent_Text, @MessageType, @Status, @IsHSM, @ChatbotResponse,
//         @AgentId, @SentAt, @DeliveredAt, @ReadAt, @FailureResponse,
//         @UserName, @CountryCode, @SubmittedMessageId, @MessagePrice,
//         @DeductionType, @MauDetails, @WhatsAppConversationDetails_Id,
//         @WhatsAppConversationDetails_Type, @Context, @MessageId
//     );
// END;
