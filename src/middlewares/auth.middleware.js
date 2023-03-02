import auth from '../configs/auth.config.js';

 const check_auth = (req, res, next) => {
    // Anybody can read the database without restriction
    if (req.method === "GET") { next(); } else {
    // But only those with password can write to it
        try {
            let can_write = req.get("Authentication");
            if (can_write === auth.write_password) { next(); } else {
                throw {"message": "only authorized requests permitted"}
            }
        } catch (e) {
            res.status(511).send(e)
        }
    }
};


export default check_auth ;
