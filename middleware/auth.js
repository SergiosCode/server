import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "secret");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;