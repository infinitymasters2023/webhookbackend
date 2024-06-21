

import { ConnectionPool } from 'mssql';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            try {
                const pool = new ConnectionPool({
                    user: process.env.DB_USER || 'azure-sa',
                    password: process.env.DB_PASS || 'ugsf127ghFHSD86dfsDS',
                    server: process.env.DB_HOST || 'infinitysqlmanagedinstance.22e461bedfe7.database.windows.net',
                    database: process.env.DB_NAME || 'iapl',
                    options: {
                        encrypt: false,
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
