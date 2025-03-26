import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const authorise = async (req, res, next) => {
  if (!req.headers.authorisation) {
    return res
      .status(401)
      .json({ message: "This route requires a authentication token" });
  }

  const token = req.headers.authorisation.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.token = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: "The authentication is invalid" });
  }
};
export default authorise;
