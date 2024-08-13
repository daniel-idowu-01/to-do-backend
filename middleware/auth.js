export const getAuth = (req, res, next) => {
  const authHeader = req.headers;
  const authHeaderArray = Object.keys(authHeader);

  if (!authHeaderArray.includes("testkey")) {
    return res.status(401).json({ success: false, data: "Unauthorized" });
  }

  if (authHeader.testkey !== "testingkey") {
    return res.status(400).json({ success: false, data: "Invalid api key" });
  }
  
  next();
};
