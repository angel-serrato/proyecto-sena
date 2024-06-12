const errorHandler = (req, res, next) => {
    res.locals.errorMsg = req.session.errorMsg;
    delete req.session.errorMsg;
    next();
};

export default errorHandler;
