import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error with the middleware ", error);
    res.status(500).json({ message: "Error handling middleware" });
  }
};

// import jwt from "jsonwebtoken";
// import User from "../models/User";

// export const protectRoute = (req, res, next) => {
//   try {
//     const token = req.cookie.jwt;
//     if (!token)
//       return res
//         .status(401)
//         .json({ message: "Unauthorized - No token provided" });
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded)
//       return res.status(401).json({ message: "Unauthorized - Invalid token" });

//     const user = User.findById(decoded.userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error in protectedRoute middleware: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
