import express from 'express'
import { createPost, getAllPosts, deletePost, updatePost } from '../controllers/postController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getAllPosts)
router.post('/', protect, createPost)
router.put('/:postId', protect, updatePost)
router.delete('/:postId', protect, deletePost)

export {router as postRoutes}