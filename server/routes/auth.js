import express from 'express';
import {requireSignin} from "../middlewares";
import { register,login,emailVerify,currentUser,sendLink,resetPassword } from '../controllers/auth';


const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get(`/users/:_id/verify/:emailToken`,emailVerify);
router.get("/current-user",requireSignin,currentUser);
router.post('/sendpasswordlink',sendLink);
// router.get('/reset-password/:_id/:passwordToken',validUser);
router.post('/:_id/:passwordToken',resetPassword);

module.exports = router;