const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode  ? err.statusCode : 500;
    res.status(statusCode);
    res.json({
        error: err?.message.substr(7),
    })
}

module.exports = {errorHandler}