import sql from 'mssql';
import { env } from '../config/env';

let pool: sql.ConnectionPool | null = null;

export async function getPool() {
  try {
    if (pool) {
      return pool;
    }

    pool = await sql.connect({
      server: env.db.server,
      database: env.db.database,
      user: env.db.user,
      password: env.db.password,
      options: env.db.options as sql.config["options"]
    });

    console.log('Conectado a SQL Server');
    return pool;
  } catch (error) {
    console.error('Error conectando a SQL Server:', error);
    pool = null; // Para evitar usar un pool corrupto
    throw error; // Dejas que el controlador/servicio maneje el fallo
  }
}

export { sql };
