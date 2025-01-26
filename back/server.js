const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

 // CORS configuration
const corsOptions = {
    origin: "http://localhost:5173", // Autorise uniquement cette origine
    methods: "GET,POST", // Méthodes autorisées
    allowedHeaders: "Content-Type,Authorization", // En-têtes autorisés
  };

app.use(cors(corsOptions)); // Appliquer la configuration CORS

app.get('/api', (req, res) => {
    res.json({ results: [1, 2, 3] });
});

//listen on port 8080 for all requests
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});