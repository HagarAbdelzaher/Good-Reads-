const Joi = require("joi");
const asyncFunction = require('../middlewares/async');

const validation = (schema) => asyncFunction(async (req, res, next) => {
    const errorValidation = [];
    ['params', 'query','body'].forEach((key) => {
        if (schema[key]) {
            const validation = schema[key].validate(req[key]);
            if (validation.error) {
                errorValidation.push(validation.error);
            }
        }
    });
    if (errorValidation.length > 0) {
        throw {status: 422, message: errorValidation[0].details[0].message};
    } else {
        next();
    }
});

const adminValidator = {
    loginAdmin: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(8),
        })
    }
}

const authorValidator = {
    createAuthor: {
        body: Joi.object().keys({
            firstName: Joi.string().required().min(3),
            lastName: Joi.string().required().min(3),
            bio: Joi.string(),
            dob: Joi.date().required()
        })
    },
    updateAuthor: {
        body: Joi.object().keys({
            firstName: Joi.string().min(3),
            lastName: Joi.string().min(3),
            bio: Joi.string(),
            dob: Joi.date()
        }),
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required(),
        })
    },
    idParams: {
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required(),
        })
    }
}

const categoryValidator = {
    createCategory: {
        body: Joi.object().keys({
            Name: Joi.string().required().min(3),
        })
    },
    updateCategory: {
        body: Joi.object().keys({
            Name: Joi.string().min(3),

        }),
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required(),
        })
    },

    idParams: {
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required(),
        }),
    }
}

const usersValidator = {
    loginUser: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
    },
    createUser: {
        body: Joi.object().keys({
            firstName: Joi.string().required().min(3),
            lastName: Joi.string().required().min(3),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(8),
        })
    },
    updateUser: {
        body: Joi.object().keys({
            firstName: Joi.string().min(3),
            lastName: Joi.string().min(3),
            email: Joi.string().email(),
            password: Joi.string().min(8),
        })
    },
    idParams: {
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required(),
        }),
    }
}

const bookValidator = {
    createBook: {
        body: Joi.object().keys({
            name: Joi.string().required().min(3),
            categoryId: Joi.string().required().length(24),
            authorId: Joi.string().required().length(24),
            description: Joi.string(),
            
        })
    },
    updateBook: {
        body: Joi.object().keys({
            name: Joi.string().required().min(3),
            categoryId: Joi.string().required().length(24),
            authorId: Joi.string().required().length(24),
            description: Joi.string(),
        })
    },
    idParams: {
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required()
        }),
    }
}

const userBookValidator = {
    addShelf: {
        body: Joi.object().keys({
            bookId: Joi.string().required().length(24),
            shelf: Joi.string().required().valid('Want to read', 'Read', 'Reading')
        })
    },
    updateShelf: {
        body: Joi.object().keys({
            bookId: Joi.string().required().length(24),
            shelf: Joi.string().required().valid('Want to read', 'Read', 'Reading')
        })
    },
    addRating:{
        body: Joi.object().keys({
            bookId: Joi.string().required().length(24),
            rating: Joi.number().required()
        })
    },
    addReview:{
        body: Joi.object().keys({
            bookId: Joi.string().required().length(24),
            review: Joi.string().required()
        })
    },
    idParams: {
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required(),
        }),
    }
}


module.exports = {
    validation, adminValidator, authorValidator, categoryValidator, usersValidator, bookValidator, userBookValidator
}