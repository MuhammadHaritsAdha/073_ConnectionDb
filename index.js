import express from 'express';
import pg from 'pg';

const app = express();
const PORT = 3000;
const { Pool } = pg;

app.use(express.json());
app.use(
    express.urlencoded({ 
        extended: true, 
    })
)

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password:'123',
    port: 5432,
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}.`)
})