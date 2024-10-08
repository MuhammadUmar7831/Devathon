import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
) //CORS Policy check
app.use(express.json({ limit: "20kb" })) //JSON data with limit
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
) //Data from URL check
app.use(express.static("public")) //Static files Check
app.use(cookieParser()) //Cookies Check

//ROUTES import
import userRoutes from "./routes/user.routes.js"
//routes declaration
app.use("/api/user", userRoutes)

export { app }
