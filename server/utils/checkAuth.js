const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = (context) => {
    // context = { ...headers }
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY);
                return user;
            } catch (err){
                throw new AuthenticationError("Invalid/Expired token");
            }
        }
        throw new Error("Authentication token must be Bearer");
    }
    throw new Error("Authentication header token must be provided");
}