import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from 'jsonwebtoken';


import crypto from 'crypto';
import nodemailer from 'nodemailer';


export const register = async (req, res) => {
    // console.log("REGISTER ENDPOINT==>", req.body);
    const { name, email, password } = req.body;

    // Applyling some checks on user input
    if (!name) {
        // return res.json({
        //     error: "Name is required",
        // });
        return res.status(404).send("Name is required");
    };
    if (!password || password.length < 8) {
        return res.json({
            error: "Password is required and should be atleast 8 characters long",
        });
    };
    const exist = await User.findOne({ email: email });
    if (exist) {
        return res.json({
            error: "Email is already taken",
        });
    };
    // HAshing the password
    const hashedPassword = await hashPassword(password);

    const user = new User({ name, email, password: hashedPassword, emailToken: crypto.randomBytes(32).toString("hex") });
    // sending mail

    // const token = await new Token({
    //     userId: user._id,
    //     token: crypto.randomBytes(32).toString("hex")
    // }).save();

    const url = `${process.env.BASE_URL}users/${user.id}/verify/${user.emailToken}`;

    // await sendEmail(user.email, "Verify Email", url)
    var transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
        from: process.env.USER,
        to: user.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: `<h4>Mr./Mrs. ${user.name} welcome to our platform..</h4>
             <br></br>
        <img src="https://res.cloudinary.com/dzihaxgx8/image/upload/v1690542634/email_hub7ol.png">
            <h4>Please verify your email...</h4>
            <p>In order to start using our platform, you need to confirm your email address</p>
            <br></br>
            <p> Click on below link to verify your account</p>
           
            <a href=${url} class="btn btn-primary">Verify link</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    try {
        await user.save();
        //  console.log("Registered user==>",user);
        return res.json({
            ok: true,
            message: "Email sent successfully"
        });

    } catch (err) {
        console.log("Registration Failed==>", err);
        return res.status(400).send("Error,Try again");
    }
};

export const emailVerify = async (req, res) => {
    try {
        // console.log(req.params._id);
        const user = await User.findOne({ _id: req.params._id });

        if (user) {
            user.verified = true;
            user.emailToken = null;
            await user.save();
            // res.redirect('/login')
            return res.json({
                success: "Email verified successfully",
            });
            // res.json({
            //     message: "Email verified successfully"
            // })
        }
        else {
            // res.redirect('/register');
            console.log('email is not verified');
            return res.json({
                error: "Email is not verified",
            });
        }
        //     if (!token) return res.status(400).send({ message: "invalid link" });

        //     await User.updateOne({ _id: user._id, verified: true });
        //     await token.remove();

        //     res.status(200).send({ message: "Email verified successfully" });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });

    }
}

export const login = async (req, res) => {

    try {

        // checking that user is in our database or not.
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                error: "No user found with this email",
            });
        }

        //checking password
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.json({
                error: "Wrong password",
            });
        }

        if (!user.verified) {
            const url = `${process.env.BASE_URL}users/${user.id}/verify/${user.emailToken}`;

            // await sendEmail(user.email, "Verify Email", url)
            var transporter = nodemailer.createTransport({
                service: process.env.SERVICE,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });

            var mailOptions = {
                from: process.env.USER,
                to: user.email,
                subject: 'Sending email for account verification',
                text: 'That was easy!',
                html: `<h4>Mr./Mrs. ${user.name} welcome to our platform..</h4>
             <br></br>
        <img src="https://res.cloudinary.com/dzihaxgx8/image/upload/v1690542634/email_hub7ol.png">
            <h4>Please verify your email...</h4>
            <p>In order to start using our platform, you need to confirm your email address</p>
            <br></br>
            <p> Click on below link to verify your account</p>
           
            <a href=${url} class="btn btn-primary">Verify link</a>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.json({
                error: "Email is not verified. We sent another email please verify it.",
            });

        }
        // creating signed token

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        user.password = undefined;
        res.json({
            token,
            user
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error.Try again.")
    }
};

export const currentUser = async (req, res) => {
    // console.log(req.auth);
    try {
        const user = await User.findById(req.auth._id);
        // res.json(user);
        res.json({ ok: true })

    } catch (err) {
        console.log(err);
        res.sendStatus(400);

    }

};

export const sendLink = async (req, res) => {
    // console.log(req.body);
    const { email } = req.body;

    if (!email) {
        return res.json({
            error: "Email is required",
        });
    }
    try {
        const userfind = await User.findOne({ email: email });

        if (!userfind) {
            return res.json({
                error: "No user is found with this email",
            });
        }

        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
            expiresIn: "1200s"
        });

        const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { passwordToken: token }, { new: true });


        if (setusertoken) {
            var transporter = nodemailer.createTransport({
                service: process.env.SERVICE,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 10 MINUTES http://localhost:3000/reset-password/${userfind.id}/${setusertoken.passwordToken}`
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    // res.status(401).json({ status: 401, message: "email not send" })
                    return res.json({
                        error: "Unable to sent email",
                    });
                } else {
                    console.log("Email sent", info.response);
                    // res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                    return res.json({
                        success: "pasword reset link send Succsfully in Your Email",
                    });
                }
            })

        }

    } catch (error) {
        res.status(401).json({ status: 401, message: "invalid user" })
    }


};


export const resetPassword = async (req, res) => {

    const _id = req.params._id;
    const passwordToken = req.params.passwordToken;
    // console.log("id =>",_id);
    // console.log("pass =>",passwordToken);
    // console.log(req.body);
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
        return res.json({
            error: "Password is required and should be atleast 8 characters long",
        });
    };

    try {
        const validuser = await User.findOne({ _id: _id, passwordToken: passwordToken });
        //  console.log(validuser)
        const verifyToken = jwt.verify(passwordToken, process.env.JWT_SECRET);

        if (validuser && verifyToken._id) {
            const newpassword = await hashPassword(newPassword);

            const setnewuserpass = await User.findByIdAndUpdate({ _id: _id }, { password: newpassword });

            setnewuserpass.save();
            return res.json({
                success: "Password changed successfuly. Now you can login with your new password",
            });

        }
        else {
            return res.json({
                error: "Token has expired. Please generate new link to change your password",
            });

        }
    } catch (err) {
        console.log(err);
    }
}