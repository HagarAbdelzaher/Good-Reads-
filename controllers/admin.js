const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Admin } = require('../models/admin');
const asyncFunction = require('../middlewares/async');

const { JWT_SECRET = 'test' } = process.env;

///////////////////////////////// login admin ///////////////////////////////////////////

const loginAdmin = asyncFunction(async (req, res) => {
    const { email, password } = req.body;
    const adminAuthentication = await Admin.findOne({ email }).exec();
    if (!adminAuthentication) {
      throw { status: 401, message: 'Incorrect Email or Password' };
    }
    const isPasswordValid = adminAuthentication.verifyPassword(password);
    if (!isPasswordValid) {
        throw { status: 401, message: 'Incorrect Email or password' };
    }
    const token = jwt.sign({ id: adminAuthentication._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.header('x-auth-token', token);
    res.status(200).send({ Token: token });
});



module.exports = {
  loginAdmin,
};
