const env = process.env;
const db = {
    host: env.VCAPI_HOST,
    user: env.VCAPI_USER,
    password: env.VCAPI_PASSWORD,
    database: env.VCAPI_DATABASE,
    port: env.VCAPI_PORT,
};

export default db;
