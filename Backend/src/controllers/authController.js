import User from "../models/User.js"
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(name, email, password)

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        //check is user already exist
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exist!!"
            })
        }

        const otp = generateOTP();
        await Otp.deleteMany({ email, purpose: "REGISTER" });

        //create Otp
        const createOtp = await Otp.create({
            email,
            otp,
            purpose: "REGISTER",
            expiresAt: new Date(Date.now() + 2 * 60 * 1000)
        })

        console.log(createOtp)

        await sendOtp(email, otp)

        return res.status(201).json({
            success: true,
            message: "Otp sent Successfully!!",
            // userInfo: newUser
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error!!",
            error: error.message
        })
    }
}

const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (email, otp) => {

    //create Ethernal test account
    const testAccount = await nodemailer.createTestAccount();

    const transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    const info = await transporter.sendMail({
        from: '"Auth App" <no-reply@authapp.com>',
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}. It will expire in 2 minutes.`
    });

    console.log("OTP Sent ✔");
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}


export const resendOtp = async (req, res) => {

    try {
        const { email } = req.email
        console.log(email)
        const otp = await generateOTP();

        await sendOtp(email, otp)

        return res.status(201).json({
            success: true,
            message: "Otp sent Successfully!!",
            // userInfo: newUser
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error!!",
            error: error.message
        })
    }
}


export const verifyOtp = async (req, res) => {

    try {
        const { name, email, password, otp } = req.body
        console.log(name, email, password, otp)

        const otpRecord = await Otp.findOne({
            email,
            otp: otp.toString(),
            purpose: "REGISTER"
        })
        console.log(otpRecord)

        console.log("DB OTP:", otpRecord?.otp);
        console.log("USER OTP:", otp);

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid Otp"
            })
        }

        if (otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Otp expired"
            })
        }

        //hashPassword
        const hashPassword = await bcrypt.hash(password, 10)
        const newuser = await User.create({
            name,
            email,
            password: hashPassword
        })

        await Otp.deleteMany({ email, purpose: "REGISTER" });

        return res.status(200).json({
            success: true,
            message: "User verified and created Successfully",
            user: newuser
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }

}

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        console.log(email, password)

        if (!email || !password) {
            return res.staus(400).json({
                success: false,
                message: "Email & Password required"
            })
        }

        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.staus(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid creadentials"
            })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            success: true,
            message: "Login Successfull!!",
            user: {
                user: user,
                accessToken: token
            }
        })

    }
    catch (error) {
        console.error("Login Error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

export const resetPassword = async (req, res) => {

    try {
        const email = req.body
        console.log(email)

        if (!email) {
            return res.staus(400).json({
                success: false,
                message: "Email is required"
            })
        }

        const user = User.findByIdAndUpdate({ email, password });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully!!",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

