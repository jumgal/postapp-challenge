import models from "../models/index.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await models.Post.findAll();

    if (allPosts?.length === 0) {
      res.status(400);
      throw new Error("No posts to show");
    } else {
      res.status(200).json(allPosts);
    }
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Please include title for your post");
    }

    const newPost = await models.Post.create({
      title,
      userId: req.user.id,
    });

    if (newPost) {
      res.status(201).json(newPost);
    } else {
      res.status(400);
      throw new Error("Invalid post data");
    }
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title } = req.body;

    const post = await models.Post.findByPk(postId);

    if (!post) {
      res.status(400);
      throw new Error("Post does not exist");
    }

    // check if user created this post
    if (post.userId !== req.user.id) {
      res.status(401);
      throw new Error("you can update only your post");
    }

    if (title) {
      await post.update({ title });
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(400)
      throw new Error('title is required')
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await models.Post.findByPk(postId);
    if (post) {
      await models.Post.destroy({
        where: {
          id: postId,
        },
      });
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(400);
      throw new Error("please provide valid post");
    }
  } catch (error) {
    next(error);
  }
};
