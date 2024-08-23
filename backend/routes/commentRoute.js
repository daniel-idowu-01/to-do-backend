import expressRouter from 'express'
import { createComment, getCommentById, getCommentByTaskId, deleteCommentById } from '../controllers/commentController.js'
import { getAuth } from '../middleware/auth.js'

const router = expressRouter()

router.post('/:taskId', getAuth, createComment)

router.get('/:id', getAuth, getCommentById)

router.get('/task/:id', getAuth, getCommentByTaskId)

router.delete('/:id', getAuth, deleteCommentById)


export default router