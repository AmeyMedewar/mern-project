// import express from 'express';
// import cors from 'cors'
// import cookieParser from 'cookie-parser';

// import { route } from './Routes/route.js';
// import 'dotenv/config'
// import connectDB from './Db/index.js';


// const server = express();
// const PORT = process.env.PORT || 8000;
// server.use(cors({
//   origin: [process.env.CORS_ORIGIN],
//   credentials: true, //requiured for setting cookie... /** https://www.reddit.com/r/reactjs/comments/vxvdib/cookie_not_being_set_in_react_app_express_backend/?rdt=46764 */
// }));

// server.use(cookieParser());
// server.use(express.json({limit: "16kb"}));
// server.use(express.urlencoded({ extended: true }));


// // connect to db:
// connectDB()
// .then(()=>{
//   // starting the server 
//     server.listen(PORT , ()=>{
//         console.log("Server is running at " + PORT);
//     })
// })
// .catch(error=>{
//     console.log("Error connecting::index.js",error);
// })


// server.use("/api", route)

// server.get("/", (req, res) => {
//   res.send("Hello to backend")
// })

// server.get('*', (req, res) => {
//   res.send("404 NOT FOUND <a href='./'> Go To Home</a>")
// })



import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { route } from './Routes/route.js';
import 'dotenv/config';
import connectDB from './Db/index.js';

const server = express();
const PORT = process.env.PORT || 8000;

// Update CORS to handle multiple origins if necessary
server.use(cors({
  origin: [process.env.CORS_ORIGIN], // Allow the frontend to connect from this origin
  credentials: true, // Required for setting cookies (if using cookies for sessions)
}));

server.use(cookieParser());
server.use(express.json({ limit: "16kb" }));
server.use(express.urlencoded({ extended: true }));

// Connect to database:
connectDB()
  .then(() => {
    // Start the server after DB connection is successful
    server.listen(PORT, () => {
      console.log("Server is running at " + PORT);
    });
  })
  .catch(error => {
    console.log("Error connecting::index.js", error);
  });

// Set up the routes
server.use("/api", route);

// Default route for the backend (optional)
server.get("/", (req, res) => {
  res.send("Hello to backend");
});

// Handle 404 routes
server.get('*', (req, res) => {
  res.status(404).send("404 NOT FOUND <a href='./'> Go To Home</a>");
});

