/* eslint-disable prettier/prettier */
// USE [iapl]
// GO

// /****** Object: StoredProcedure [dbo].[InsertWebhookData] Script Date: 6/22/2024 11:45:17 AM ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO

// ALTER PROCEDURE [dbo].[InsertWebhookData]
//     @id NVARCHAR(255),
//     @type NVARCHAR(50),
//     @timestamp NVARCHAR(50),
//     @message_id NVARCHAR(255),
//     @brand_msisdn NVARCHAR(50),
//     @request_id NVARCHAR(255),
//     @from NVARCHAR(255),
//     @body NVARCHAR(MAX),
//     @name NVARCHAR(255),
//     @wa_id NVARCHAR(50)
// AS
// BEGIN
//     SET NOCOUNT ON;

//     IF (@type = '1') -- Assuming @type is compared against a string '1'
//     BEGIN
//         INSERT INTO WebhookData (id, type, timestamp, message_id, brand_msisdn, request_id, [from], body, name, wa_id)
//         VALUES (@id, @type, @timestamp, @message_id, @brand_msisdn, @request_id, @from, @body, @name, @wa_id);
//     END;
// END;