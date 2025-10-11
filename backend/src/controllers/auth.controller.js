import { senderWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("REQ HEADERS:", req.headers);
  console.log("REQ BODY:", req.body);

  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      res.status(400).json({ message: "password must be greater 6" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });

    if (user) res.status(400).json({ message: "user already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });
      try {
        senderWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL
        );
      } catch (error) {
        console.error("Failed to send welcome email: ", error);
      }
    } else {
      res.status(400).json({ message: "user data is invalid" });
    }
  } catch (error) {
    console.log("Error signing up user: ", error);
  }
};

// export const signup = async (req, res) => {
//   const { fullname, email, password, profilePic } = req.body;

//   try {
//     if (!fullname || !email || !password) {
//       return res.status(400).json({ message: "All field required" });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be atleast 6 character" });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)){
//         return res.status(400).json({message: "Invalid email format"})
//     }

//     const user = await User.findOne(email);
//     if (user) return res.status(400).json({message: "User already exist"})

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//         fullname,
//         email,
//         password: hashedPassword,
//         // profilePic: profilePic
//     })

//     if (newUser) {
//         generateToken(userId, res);
//         await newUser.save()

//         res.status(201).json({
//             _id: newUser._id,
//             fullname: newUser.fullname,
//             email:newUser.email,
//             profilePic: newUser.profilePic
//         })
//     } else {
//         res.status(400).json({message: "User data is invalid"})
//     }

//   } catch (error) {}
//   res.send("Signup Endpoint");
// };

export const login = (req, res) => {
  res.send("Login Endpoint");
};

export const update = (req, res) => {
  res.send("Update endpoint");
};
