import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Getting the token from the header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Separating the token
    const token = authHeader.split(" ")[1];

    // Verifying the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attaching the decoded user in request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
