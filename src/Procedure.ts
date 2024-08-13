// USE [iapl]
// GO
// /****** Object:  StoredProcedure [dbo].[InsertWebhookData]    Script Date: 8/13/2024 4:41:12 PM ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO

//  ALTER PROCEDURE [dbo].[InsertWebhookData]
//      @id NVARCHAR(255)=null,
//      @type NVARCHAR(50)=null,
//      @timestamp NVARCHAR(50)=null,
//      @message_id NVARCHAR(255)=null,
//      @brand_msisdn NVARCHAR(50)=null,
//      @request_id NVARCHAR(255)=null,
//      @from NVARCHAR(255)=null,
//      @body NVARCHAR(MAX)=null,
// 	 @payload NVARCHAR(MAX)=null,
//      @name NVARCHAR(255)=null,
//      @wa_id NVARCHAR(50)=null,
// 	 @apiKey NVARCHAR(255) = NULL,
// 	 @document NVARCHAR(MAX) = NULL,
// 	 @caption NVARCHAR(255) = NULL,
// 	 @file NVARCHAR(255) = NULL,
// 	 @id_docs INT = NULL,
// 	 @mime_type NVARCHAR(50) = NULL,
//      @sha256 CHAR(64) = NULL,
//      @media_url NVARCHAR(MAX) = NULL,
//     @from_msisdn VARCHAR(20)=Null,
// 	@type_voice NVARCHAR(50)=Null,
//     @message_type VARCHAR(20)=Null,
//     @file_path VARCHAR(255)=null,
//     @image_id VARCHAR(100)=null,
// 	 @MessageId NVARCHAR(255)=null,
//     @VoiceId NVARCHAR(255) = NULL,
//     @VoiceFile NVARCHAR(MAX) = NULL,
//     @VoiceMimeType NVARCHAR(255) = NULL,
//     @VoiceSha256 NVARCHAR(64) = NULL,
//     @VoiceMediaUrl NVARCHAR(MAX) = NULL,
//     @BrandMsisdn NVARCHAR(255)=null,
//     @RequestId NVARCHAR(255)=null

 
//  AS
//  BEGIN
//      SET NOCOUNT ON;

//      IF (@type = '1') -- Assuming @type is compared against a string '1'
//      BEGIN
//          INSERT INTO WebhookData (id, [type], [timestamp], message_id, brand_msisdn, request_id, request_mobileno, body, name, wa_id,payload)
//          VALUES (@id, @type, @timestamp, @message_id, @brand_msisdn, @request_id, @from, @body, @name, @wa_id,@payload);
//      END;
	 
// 	 IF (@type ='2')
// 	 BEGIN
// 		INSERT INTO iapl_getwebhookdocuments (apiKey, [from], [timestamp], [type], document, caption, [file], id_docs, mime_type, sha256, media_url,create_date)
//         VALUES (@apiKey, @from, @timestamp, @type, @document, @caption, @file, @id_docs, @mime_type, @sha256, @media_url,GETDATE());
// 	END
// 	 IF (@type ='3')
// 	 BEGIN
// 		INSERT INTO webhookimages (
//     apikey, 
//     [from], 
//     timestamp, 
//     id, 
//     [type], 
//     [file], 
//     image_id, 
//     mime_type, 
//     sha256, 
//     caption, 
//     media_url, 
//     brand_msisdn, 
//     request_id, 
//     created_at
// )
// VALUES (
//     @apiKey, 
//     @from, 
//     @timestamp, 
//     @id, 
//     @message_type, 
//     @file, 
//     @image_id, 
//     @type, 
//     @sha256, 
//     @caption, 
//     @media_url, 
//     @brand_msisdn, 
//     @request_id,
//     GETDATE()
// );
// 	END
// 	 IF (@type ='4')
// 	 BEGIN
// 	 INSERT INTO webhookvideoMessages (
//         MessageId,
//         [From],
//         timestamp,
//         type_voice,
//         VoiceId,
//         VoiceFile,
//         VoiceMimeType,
//         VoiceSha256,
//         VoiceMediaUrl,
//         brand_msisdn,
//         RequestId
//     )
//     VALUES (
//         @MessageId,
//         @From,
//         @Timestamp,
//         @type_voice,
//         @VoiceId,
//         @VoiceFile,
//         @VoiceMimeType,
//         @VoiceSha256,
//         @VoiceMediaUrl,
//         @BrandMsisdn,
//         @RequestId
//     );
//  END;
//  END
 
