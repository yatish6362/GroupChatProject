import {Router} from 'express'
import { body } from 'express-validator'
import * as projectController from '../controllers/project.controller.js'
import { userAuthMiddleware } from '../middleware/auth.middleware.js'

const router=Router()

router.post('/create',
    body('name').isString().withMessage('Name is required'),
    userAuthMiddleware, 
    projectController.createProject
)

router.get('/all',
    userAuthMiddleware,
    projectController.getAllProject
)

router.put('/add-user',
    userAuthMiddleware,
    body('projectId').isString().withMessage('project id must be string'),
    body('users').isArray({min:1}).withMessage('users must be an array').bail().custom((users)=>users.every(user=>typeof user==='string')).withMessage('Each user must be a string'),
    projectController.addUserToProject
)

export default router