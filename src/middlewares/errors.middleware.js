import ERRORS from '../repository/errors/errors.nums.js'

export default (error, req, res, next) => {
    req.logger.info(error.cause)
    switch (error.code) {
        case ERRORS.INPUT_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case ERRORS.NOT_FOUND_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case ERRORS.GENERAL_ERROR:
            res.send({ status: 'error', error: error.name });
            break;    

        case ERRORS.AUTHENTICATION_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case ERRORS.AUTHORIZATION_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        default:
            res.send({ status: 'error', error: `Error sin identificar` });
            break;
    }
}