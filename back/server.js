
import express from "express";
import cors from "cors";
import calculateScore from "./calculate-score.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

 // CORS configuration
const corsOptions = {
    origin: "http://localhost:5173", // Autorise uniquement cette origine
    methods: "GET,POST", // Méthodes autorisées
    allowedHeaders: "Content-Type,Authorization", // En-têtes autorisés
  };

app.use(cors(corsOptions)); 

app.post('/api/calculate-score', (req, res) => {
    const { player1, player2, pointList } = req.body;
    
    try {
    if (!player1 || !player2  || !pointList) {
      throw new Error();
    }

    const { winner, sets} = calculateScore(player1, player2, pointList);
    //todo send back winner and results 
    res.status(200).json({ winner, sets});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



