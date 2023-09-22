import { Pool } from "pg";

const db: Pool = new Pool({
  host: Bun.env.DB_HOST_DEV,
  user: Bun.env.DB_USER_DEV,
  database: Bun.env.DB_DATABASE_DEV,
  password: Bun.env.DB_PASSWORD_DEV,
  port: Number(Bun.env.DB_PORT_DEV),
});

export default db;
