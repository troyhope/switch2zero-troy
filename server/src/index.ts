import express from "express";
import cors from "cors";

import countryRoutes from "./routes/countryRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", countryRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
