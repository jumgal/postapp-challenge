// import pool from "../config/db.js";

export const getAllPosts = (req, res, next) => {
  try {
    res.status(200).send("get all posts route");
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title } = req.body;

    // const newPost = await pool.query(
    //     "INSERT INTO posts (title) VALUES($1)",
    //     [title]
    // )
    // res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
