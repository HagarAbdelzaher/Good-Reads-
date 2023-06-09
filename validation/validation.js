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
            authorId: Joi.string().length(24).required(),
        })
    },
    idParams: {
        params: Joi.object().required().keys({
            authorId: Joi.string().length(24).required(),
        })
    }
}

const categoryValidator = {
    createCategory: {
        body: Joi.object().keys({
            name: Joi.string().required().min(3),
        })
    },
    updateCategory: {
        body: Joi.object().keys({
            name: Joi.string().required().min(3),

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
            name: Joi.string().min(3),
            categoryId: Joi.string().length(24),
            authorId: Joi.string().length(24),
            description: Joi.string(),
        }),
        params: Joi.object().required().keys({
            id: Joi.string().length(24).required(),
        })
    },
    idParams: {
        params: Joi.object().required().keys({
            id: Joi.string().required().length(24)
        }),
    },
    categoryIdParams: {
        params: Joi.object().required().keys({
            categoryId: Joi.string().required().length(24),
        }),
    },
    query: {
        params: Joi.object().required().keys({
            query: Joi.string()
        }),
    },
    
    
    
}

const userBookValidator = {
    addShelf: {
        body: Joi.object().keys({
            bookId: Joi.string().required().length(24),
            shelf: Joi.string().valid('Want to read', 'Read', 'Reading')
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
            rating: Joi.number().min(0).max(5).required()
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
            bookId: Joi.string().length(24).required(),
        }),
    },
    shelfParams:{
        params: Joi.object().required().keys({
            shelf:  Joi.string().required().valid('Want to read', 'Read', 'Reading' , 'all'),
        }),

        
       
    }
}


module.exports = {
    validation, adminValidator, authorValidator, categoryValidator, usersValidator, bookValidator, userBookValidator
}