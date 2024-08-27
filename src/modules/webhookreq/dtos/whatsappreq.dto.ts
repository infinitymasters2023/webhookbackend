export class ImageMessageDto {
  messages: MessageDto[];
  contacts: ContactDto[];
  brand_msisdn: string;
  request_id: string;
  upload_url: string;
}

class MessageDto {
  id: string;
  from: string;
  type: string;
  timestamp: string;
  image: ImageDetailsDto;
}

class ImageDetailsDto {
  mime_type: string;
  sha256: string;
  id: string;
  media_url: string;
}

class ContactDto {
  profile: ProfileDto;
  wa_id: string;
}

class ProfileDto {
  name: string;
}


