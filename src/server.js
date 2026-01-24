const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/auth.routes")

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes);


// app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT ||5000;
app.listen(PORT, ()=>{
    console.log(`server is listening on ${PORT}`);
})