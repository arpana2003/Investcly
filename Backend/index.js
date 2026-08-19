const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

require("./config/passport.js");
require('./config/db'); // DB connection

const authRoutes = require('./routes/auth.js');
const adminUploadRoutes = require('./routes/AdminUpload.js');
const storyRoutes = require('./routes/storyRoutes.js');
const cloudinaryRoutes = require('./routes/Cloudinary.js');

const app = express();
const PORT = process.env.PORT || 5000;
console.log("HELLO");
// ✅ Allow frontend in dev or prod
const rawOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:5173";

// const rawOrigin ="http://localhost:5173";

const allowedOrigin = rawOrigin.replace(/\/$/, ""); // remove trailing slash if present
console.log("___________________________________________________________",process.env.MONGO_URI);

console.log("HELLO2");
app.use(cors({ origin: allowedOrigin, credentials: true }));
console.log("CORS Allowed Origin:", allowedOrigin);

app.use(express.json());
console.log("HELLO3");

// 🔹 API routes
app.use('/auth', authRoutes);
app.use('/admin/upload', adminUploadRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);

// 🔹 Health check
app.get('/health', (_, res) => res.status(200).send('Healthy'));

// 🔥 Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  // const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  // Catch-all -> send index.html
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

// 🔹 Self-ping to keep server alive
const SELF_URL = process.env.CLIENT_URL;
// console.log("CLIENT_URL =", process.env.CLIENT_URL || "http://localhost:5173");

if (SELF_URL && SELF_URL.startsWith("http")) {
  setInterval(() => {
    axios.get(SELF_URL)
      .then(() => console.log("Self-ping successful!"))
      .catch(err => console.error("Self-ping failed:", err.message));
  }, 720000); // 12 min
}else {
  console.log("SELF_URL not set or invalid, skipping self-ping.");
}


// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
