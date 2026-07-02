import { Router } from "express"
import * as userController from "../controllers/user.controller.js"
import { body } from "express-validator"
import * as authMiddleware from '../middleware/auth.middleware.js'

const router=Router()

    router.post('/register',
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:3}).withMessage('minimum length 3')
    ,userController.createUserController)

    router.post('/login',
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:3}).withMessage('minimum length 3')
    ,userController.loginUserController)

    router.get('/profile',
    authMiddleware.userAuthMiddleware,
    userController.userProfileController)

export default router