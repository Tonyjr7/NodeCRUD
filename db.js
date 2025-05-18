import { Client } from "pg";
import 'dotenv/config';

// create a new client
const connectDB = new Client({
    user:     process.env.DB_USER,
    host:     process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port:     process.env.DB_PORT,
});

// connect to the database
connectDB.connect().then(() => {console.log('Connected to the database');})

// export the connection
export default connectDB;