const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("api/auth",authRoutes);
app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

