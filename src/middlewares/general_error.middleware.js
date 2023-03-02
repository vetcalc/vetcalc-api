const send_general_error = (err, req, res, next) => {
    console.error(err);
    res.status(400).send({ message: err.message });
};


export default send_general_error ;
