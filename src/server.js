const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const userRoutes = require("./routes/user.routes")
const commentRoutes = require("./routes/comment.routes")
const clapRoutes = require("./routes/clap.routes")
const tagRoutes = require("./routes/tag.routes")

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);
app.use("/api/comments",commentRoutes)
app.use("/api/claps",clapRoutes)
app.use("/api/tags",tagRoutes)


// app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT ||5000;
app.listen(PORT, ()=>{
    console.log(`server is listening on ${PORT}`);
})