import dotenv from 'dotenv';

dotenv.config();

const { SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER } = process.env;

export const dbConfig = `Server=${SQL_SERVER};Database=${SQL_DATABASE};User ID=${SQL_USER};Password=${SQL_PASSWORD};Trusted_Connection=True;TrustServerCertificate=True;`
