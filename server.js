import app from "./index.js";

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`PORT is listening at port ${port}`);
})