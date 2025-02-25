import express from "express";
import cors from "cors";
import mindmap from "./routes/mindmap.js";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 8080
const app = express();

app.use(cors());
app.use(express.json());
app.use("/mindmap", mindmap)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
