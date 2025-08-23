import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  db: {
    server: process.env.DB_SERVER ?? 'localhost',
    database: process.env.DB_NAME ?? 'ExpedientesDB',
    user: process.env.DB_USER ?? 'sa',
    password: process.env.DB_PASSWORD ?? '',
    options: {
      encrypt: (process.env.DB_ENCRYPT ?? 'false') === 'true',
      trustServerCertificate: true,
      trustedConnection: (process.env.DB_TRUSTED_CONNECTION ?? 'false') === 'true'
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'change_me',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d'
  }
};
