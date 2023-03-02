import dotenv from 'dotenv';
dotenv.config();

const env = process.env;
const auth = {
    write_password: env.WRITE_PASSWORD,
};

export default auth;
