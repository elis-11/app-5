import config from "./config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./connect-db.js";
import userRouter from "./routes/user.router.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from API!");
});

app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error("Route does not exist!");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (!err.status) {
    console.log(err);
  }
  res.status(err.status || 500).json({
    error: err.message || err,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
