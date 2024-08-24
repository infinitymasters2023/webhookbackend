/* eslint-disable prettier/prettier */
// Alter PROCEDURE sp_InserAlltMessageDetails
//     @Id  NVARCHAR(100)=null,
//     @FromPhoneNumber VARCHAR(15)=null,
//     @Timestamp  NVARCHAR(50)=null,
//     @Type VARCHAR(20)=null,
//     @BrandMsisdn VARCHAR(15)=null,
//     @RequestId  NVARCHAR(150)=null,

//     -- Voice-specific parameters
//     @VoiceFile VARCHAR(255) = NULL,
//     @VoiceId NVARCHAR(150) = NULL,
//     @VoiceMimeType VARCHAR(50) = NULL,
//     @VoiceSha256 VARCHAR(64) = NULL,
//     @VoiceMediaUrl VARCHAR(255) = NULL,

//     -- Text-specific parameters
//     @TextBody NVARCHAR(MAX) = NULL,

//     -- Image-specific parameters
//     @ImageFile VARCHAR(255) = NULL,
//     @ImageId  NVARCHAR(150) = NULL,
//     @ImageMimeType VARCHAR(50) = NULL,
//     @ImageSha256 VARCHAR(64) = NULL,
//     @ImageMediaUrl VARCHAR(255) = NULL,
//     @ImageCaption NVARCHAR(MAX) = NULL,

//     -- Document-specific parameters
//     @DocumentFile VARCHAR(255) = NULL,
//     @DocumentId  NVARCHAR(150) = NULL,
//     @DocumentMimeType VARCHAR(50) = NULL,
//     @DocumentSha256 VARCHAR(64) = NULL,
//     @DocumentMediaUrl VARCHAR(255) = NULL,
//     @DocumentCaption NVARCHAR(MAX) = NULL,

//     -- Contact-specific parameters
//     @ContactProfileName NVARCHAR(MAX) = NULL,
//     @ContactWaId VARCHAR(15) = NULL,

//     -- Optional parameter
//     @ApiKey VARCHAR(255) = NULL
// AS
// BEGIN
//     SET NOCOUNT ON;

//     INSERT INTO MessageDetails (
//         Id,
//         FromPhoneNumber,
//         Timestamp,
//         Type,
//         BrandMsisdn,
//         RequestId,
//         VoiceFile,
//         VoiceId,
//         VoiceMimeType,
//         VoiceSha256,
//         VoiceMediaUrl,
//         TextBody,
//         ImageFile,
//         ImageId,
//         ImageMimeType,
//         ImageSha256,
//         ImageMediaUrl,
//         ImageCaption,
//         DocumentFile,
//         DocumentId,
//         DocumentMimeType,
//         DocumentSha256,
//         DocumentMediaUrl,
//         DocumentCaption,
//         ContactProfileName,
//         ContactWaId,
//         ApiKey
//     )
//     VALUES (
//         @Id,
//         @FromPhoneNumber,
//         @Timestamp,
//         @Type,
//         @BrandMsisdn,
//         @RequestId,
//         @VoiceFile,
//         @VoiceId,
//         @VoiceMimeType,
//         @VoiceSha256,
//         @VoiceMediaUrl,
//         @TextBody,
//         @ImageFile,
//         @ImageId,
//         @ImageMimeType,
//         @ImageSha256,
//         @ImageMediaUrl,
//         @ImageCaption,
//         @DocumentFile,
//         @DocumentId,
//         @DocumentMimeType,
//         @DocumentSha256,
//         @DocumentMediaUrl,
//         @DocumentCaption,
//         @ContactProfileName,
//         @ContactWaId,
//         @ApiKey
//     );
// END

// select * from Iapl_crm_whatsappwebhook_resp
