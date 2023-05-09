import jwt from 'jsonwebtoken'
import models from '../models/index.js'

const protect = async (req, res, next) => {
    try {
      let token;
  
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await models.User.findByPk(decoded.id)
          next();
        } catch (error) {
          res.status(401);
          throw new Error("Unauthorized User");
        }
      }
  
      if (!token) {
        res.status(401);
        throw new Error("Unauthorized User");
      }
    } catch (error) {
      console.log("error auth middle ", error);
      next(error);
    }
  };
  
  export default protect;