const express = require("express");
const cors = require("cors");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 7000;

// <--------MiddleWire------------>
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mg5jw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run(){
    try{
        await client.connect();
        console.log("Connected to MongoDB");
        const userCollection = client.db("usersCollection").collection("user");

            // <------------------------------------- JWT ------------------------------->

            const authenticateToken = (req, res, next) => {
                const token = req.header("Authorization")?.split(" ")[1];
                if (!token) return res.status(401).json({ error: "Access denied" });
              
                jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                  if (err) return res.status(403).json({ error: "Invalid token" });
              
                  console.log("Authenticated user:", user);
                  req.user = user;
                  next();
                });
              };
              
      

          app.get("/api/users", authenticateToken, async (req, res) => {
            try {
              const users = await userCollection.find().toArray();
              console.log("Users from DB:", users); // Debugging line
              res.json(users);
            } catch (error) {
              console.error("Error fetching users:", error);
              res.status(500).json({ error: "Internal Server Error" });
            }
          });
          
      
      
          app.post("/api/users", async (req, res) => {
            const { name, email, password } = req.body;
            const newUser = { name, email, password };
            await userCollection.insertOne(newUser);
            res.status(201).json({ message: "User added successfully" });
          });
      
       
          app.get("/api/users/:id", authenticateToken, async (req, res) => {
            const user = await userCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
          });
      
  
          app.post("/api/webhook", (req, res) => {
            const { eventType, data } = req.body;
            const dbFile = "db.json";
            const existingData = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile, "utf8")) : [];
            existingData.push({ eventType, data, timestamp: new Date().toISOString() });
            fs.writeFileSync(dbFile, JSON.stringify(existingData, null, 2));
            res.json({ success: true, message: "Received" });
          });
    }catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Alhamdulliah Your server is Running");
});
app.listen(port, () => {
  console.log("Alhamdullilah Your server is Start");
});