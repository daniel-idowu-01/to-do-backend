import jwt from "jsonwebtoken";

export const getAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(req.user, 'uusseerr')

  if (!token) {
    return res.status(401).json({ success: false, data: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, okay) => {
    if (err) {
      return res.status(403).json({success: false, data: 'Forbidden'})
    }
    req.user = okay
    console.log(req.user, 'new uusseerr')
    next();
  })

};
