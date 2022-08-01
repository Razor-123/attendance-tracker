const express = require('express');
const userRouter = express.Router();
const {login,logout,signup,protectRoute,getSignUp,getLogin} = require('../controller/authController');
const {updateUser,deleteUser,getUser,getAllUser} = require('../controller/userController');
const {addSubject,getSubject,updateSubject,deleteSubject} = require('../controller/subjectController');

userRouter.route('/signup')
    .post(signup)
    .get(getSignUp)

userRouter.route('/login')
    .post(login)
    .get(getLogin)

// userRouter.route('/forgetpassword')
//     .post(forgetpassword)

// userRouter.route('/resetpassword/:token')
//     .post(resetpassword)

userRouter.route('/logout')
    .get(logout)

userRouter.use(protectRoute); // only logged in user can do below tasks

// every can access each other data
userRouter.route('')
    .get(getAllUser)


userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/myprofile')
    .get(getUser)

userRouter.route('/addsubject')
    .post(addSubject);

userRouter.route('/subject/:id')
    .get(getSubject)
    .patch(updateSubject)
    .delete(deleteSubject)


module.exports = userRouter;
