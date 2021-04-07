const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user.model');
const { genActivateToken, genRefreshToken } = require('../utils/token');
const sendMail = require('../utils/sendMail');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All field are required' });
    }

    const user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const activate_token = genActivateToken({
      username,
      email,
      password: hashedPassword,
    });

    const url = `${process.env.CLIENT_URL}/user/activate/${activate_token}`;
    sendMail(email, url, 'Verify your email');

    res.json({ message: 'Activate your email' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.activate = async (req, res) => {
  try {
    const { activate_token } = req.body;

    const user = jwt.verify(activate_token, process.env.ACTIVATE_TOKEN);
    const { username, email, password } = user;

    const match = await Users.findOne({ email });

    if (match) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new Users({
      username,
      email,
      password,
    });
    await newUser.save();

    res.json({ message: 'Account has been activated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Wrong email' });
    }

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const token = genRefreshToken({ id: user._id });
    res.cookie('token', token, {
      httOnly: true,
      path: '/user/token',
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
