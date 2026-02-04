import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    try {
        console.log("authMiddleware", req)
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // req.user = decoded; 
        req.user = {
            id: decoded.userId
        };

        console.log("User Id",req.user.id)
        next();
    }
    catch (error) {

        // EXPIRED TOKEN
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired, please login again"
            });
        }

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}