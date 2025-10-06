

import { ConnectionPool } from 'mssql';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            try {
                const pool = new ConnectionPool({
                    user: process.env.DB_USER || 'azure-sa',
                    password: process.env.DB_PASS || 'ugsf127ghFHSD86dfsDS',
                    server: process.env.DB_HOST || '192.168.1.13',
                    database: process.env.DB_NAME || 'iapl',
                    connectionTimeout: 30000,
                    requestTimeout: 30000,
                    options: {
                        encrypt: true,
                        trustServerCertificate: true
                    },
                    pool: {
                        max: 10,
                        min: 0,
                        idleTimeoutMillis: 30000,
                    },
                });

                await pool.connect();
                console.log('Connected to SQL Server');
                return pool;
            } catch (error) {
                console.error('Error connecting to SQL Server:', error.message);
                throw error;
            }
        },
    },
];

export const asyncDatabaseProviders = databaseProviders.map(provider => ({
    ...provider,
    useFactory: async () => await provider.useFactory(),
}));
