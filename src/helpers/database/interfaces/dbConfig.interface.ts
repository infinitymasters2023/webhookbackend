import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  type?: string;
  urlDatabase?: string;
  entities?: string[];
  migrationsTableName?: string;
  migrations?: string[];
  cli?: {
    migrationsDir?: string;
  };
  synchronize?: boolean;
}

export interface IDatabaseConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  type?: string;
  urlDatabase?: string;
  entities?: string[];
  migrationsTableName?: string;
  migrations?: string[];
  cli?: {
    migrationsDir?: string;
  };
  synchronize?: boolean;
}