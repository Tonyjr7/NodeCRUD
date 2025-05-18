import connectDB from '../db.js';

// fetch all users
export const fetchUsers = (req, res) => {
    const FETCH_QUERY = 'SELECT * FROM users';
    
    connectDB.query(FETCH_QUERY, (err, result) => {
        if (err) {
            res.send("Error executing request");
        } else {
            res.send(result.rows);
        }
    });
};

// fetch a single user
export const fetchUser = (req, res) => {

    const id = req.params.id;

    const FETCH_QUERY = 'SELECT * FROM users WHERE id = $1';

    connectDB.query(FETCH_QUERY, [id], (err, result) => {
        if (err) {
            res.send("Error executing request");
        }
        if (result.rows.length === 0) {
            res.send("User not found");
        }

        res.send(result.rows[0]);
    });
};

// add a new user
export const addUser = (req, res) => {
    const {name, email, age} = req.body;

    const INSERT_QUERY = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3)';

    connectDB.query(INSERT_QUERY, [name, email, age], (err, result) => {
        if (err) {
            // duplicate e-mail? Postgres unique_violation = 23505
            if (err.code === '23505') {
            return res.status(409).send('User already exists');
            }
            console.error('DB error:', err);
            return res.status(500).send('Error executing request');
        }

        // success branch
        res.send('User added successfully');
    });
};

// update a user
export const updateUser = (req, res) => {
    const id = req.params.id;

    const {name, email, age} = req.body;

    const UPDATE_QUERY = 'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4';

    connectDB.query(UPDATE_QUERY, [name, email, age, id], (err, result) => {
        if (err) {                         
            console.error('DB error:', err);
            return res.status(500).send('Error executing request');
        }

        if (result.rowCount === 0) { 
            return res.status(404).send('User not found');
        }

        res.send('User updated successfully');
    });
};

// delete a user
export const deleteUser = (req, res) => {
    const id = req.params.id;

    const DELETE_QUERY = 'DELETE FROM users WHERE id = $1';

    connectDB.query(DELETE_QUERY, [id], (err, result) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).send('Error executing request');
        }

        if (result.rowCount === 0) {
            return res.status(404).send('User not found');
        }

        res.send('User deleted successfully');
    });
}