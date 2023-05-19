const env = process.env;
const auth = {
    write_password: env.VCAPI_WRITE_PASSWORD,
};

export default auth;
