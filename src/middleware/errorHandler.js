const errorHandler = (req, res, next) => {
    res.locals.errorMsg = req.session.errorMsg;
    delete req.session.errorMsg; // Limpiar el mensaje después de mostrarlo
    next();
};

export default errorHandler;
