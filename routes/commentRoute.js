import expressRouter from 'express'
import { createComment, getCommentById, deleteCommentById } from '../controllers/commentController.js'
import { getAuth } from '../middleware/auth.js'

const router = expressRouter()

router.post('/', getAuth, createComment)

router.get('/:id', getAuth, getCommentById)

router.delete('/:id', getAuth, deleteCommentById)


export default router