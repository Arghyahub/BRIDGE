import express from "express";
import cors from "cors";
import Constants from "./constants";

const app = express();
const PORT = Constants.PORT || "5000";

app.use(cors());
app.use(express.json());

// ==================== Routes ====================
import { ParamsRouter, QuoteRouter, TokenRouter } from "./routes";
app.use("/tokens", TokenRouter);
app.use("/quotes", QuoteRouter);
app.use("/params", ParamsRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
