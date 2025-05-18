import express from 'express';

import usersRoutes from './routes/users.js';

// middleware to parse json
const app = express();
const PORT = 5000;

// middleware to parse json
app.use(express.json());

// middleware to parse urlencoded
app.use('/users', usersRoutes);

// routes to handle requests
app.get('/', (req, res) => {
    res.send("HomePage is here!");
})

// middleware to handle 404 errors
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// listen for requests on port 5000
app.listen(PORT, () => {console.log(`Server is running on port ${PORT} \n http://localhost:${PORT}`);});