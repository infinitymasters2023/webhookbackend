import { v4 as uuidV4 } from 'uuid';
import { PrimaryGeneratedColumn } from 'typeorm';

export const DatabaseDefaultUUID = uuidV4

export const DatabaseDefaultObjectId = () => PrimaryGeneratedColumn('uuid')