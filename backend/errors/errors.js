class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}
//
class BadRequest extends Error{
    constructor(message){
        super(message);
        this.name = "BadRequest";
        this.statusCode = 400;
    }
}

class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name = "ValidationError";
        this.statusCode = 422
    }
}

class ConflictError extends Error{
    constructor(message){
        super(message);
        this.name = "ConflictError";
        this.statusCode = 409
    }
}

module.exports = {
    NotFoundError,
    BadRequest,
    ValidationError,
    ConflictError
};