import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import * as glob from 'glob';
import * as dotenv from 'dotenv';
dotenv.config(); 

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const entities = await DatabaseService.getEntities()
    const dbPort = process.env.DB_PORT || '1433'
    return {
      username: process.env.DB_USER || 'azure-sa',
      password: process.env.DB_PASS || 'Pass@123',
      database: process.env.DB_NAME || 'iapl',
      host: process.env.DB_HOST || '192.168.1.12',
      port: +dbPort,
      type: 'mssql',
      entities: entities,
      migrationsRun: false,
      migrations: ["dist/migrations/*.{ts,js}"],
      options: { enableArithAbort: true, encrypt: false, trustServerCertificate: true },
      synchronize: false,
    };
  }
  static async getEntities(): Promise<string[]> {
    const entitiesPath = path.join(__dirname, '..', '..', '..');
    const pattern = path.join(entitiesPath, '/modules/**/entities/*.entity.{ts,js}').replace(/\\/g, '/');
    return new Promise<string[]>(async (resolve, reject) => {
      const files = await glob.sync(pattern);
      return resolve(files);
    });
  }
}