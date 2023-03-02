import express from 'express';
const router = express.Router();
import auth from '../configs/auth.config.js';

 router.all("*", (req, res, next) => {
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
});


export default router ;
