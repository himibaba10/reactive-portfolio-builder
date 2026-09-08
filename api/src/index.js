import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "reactive-portfolio-builder-api" });
});

app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
