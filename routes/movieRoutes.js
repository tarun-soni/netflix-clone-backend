import express from 'express'
import {
  createMovie,
  deleteMovie,
  getUserMovies
} from '../controllers/movieController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, createMovie)
router.route('/:movie_id').delete(protect, deleteMovie)
router.route('/user/:user_id').get(protect, getUserMovies)
export default router
