const express = require('express');
const cors = require('cors');
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
    const { player1Name, player2Name, pointList } = req.body;
    
    try {
    if (!player1Name || !player2Name  || !pointList) {
      throw new Error();
    }

    res.status(200).json({ player1Name, player2Name, pointList });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



