import models from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const signUpUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    // Find if user already exists
    const userExists = await models.User.findOne({where: {
      email
    }});

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await models.User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req, res, next) => {
  try {

    const { email, password } = req.body
    const user = await models.User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    next(error)
  }
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};