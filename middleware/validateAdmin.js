const validateAdmin = (req, res, next) => {
    if (req.user.role === 'Admin') {
        return next();
    } else {
        return res.status(500).send("ONLY ADMINISTRATORS CAN ACCESS THIS FUNCTION")
    }
};

module.exports = validateAdmin;