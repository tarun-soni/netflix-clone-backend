import express from 'express'
const router = express.Router()
import { authUser, getUserById } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/:id').get(protect, getUserById)
export default router
