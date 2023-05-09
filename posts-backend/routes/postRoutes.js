import express from 'express'
import { createPost, getAllPosts } from '../controllers/postController.js'


const router = express.Router()

router.get('/', getAllPosts)
router.post('/', createPost)

export {router as postRoutes}