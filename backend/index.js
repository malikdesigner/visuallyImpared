import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 3304;

app.use(bodyParser.json());
// Increase the limit for URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "QWERT!@#$%",
    database: "visuallyImpared"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the process on connection error
    } else {
        console.log('Connected to MySQL');
    }
});
app.use(cors({
    origin: ["http://192.168.100.123:3300"],
    methods: ["POST", "GET"],
    credentials: true
}))
app.post('/addUser', async (req, res) => {
    try {
        console.log("REQUEST");
        console.log(req.body);

        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            phoneCode,
            password,
        } = req.body;

        const fullnumber = phoneCode + phoneNumber;
        const currentDate = new Date().toISOString(); // Get current date in ISO format

        const sql = `INSERT INTO tbl_user (firstname, lastname, email, phone_number, password, date_added) 
                    VALUES (?, ?, ?, ?, ?, ?)`;

        const result = await query(sql, [firstName, lastName, email, fullnumber, password, currentDate]);

        console.log('Record inserted successfully');
        res.status(200).json({ ok: true, message: 'Record inserted successfully' });
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});
app.post('/addData', async (req, res) => {
    try {
        console.log("REQUEST");
        console.log(req.body);

        const {
            bookName,
            audio,
            bookFile
        } = req.body;

        const currentDate = new Date().toISOString(); // Get current date in ISO format

        const sql = `INSERT INTO tbl_data (bookName, audio, bookFile, date_added) 
                    VALUES (?, ?, ?, ?)`;

        const result = await query(sql, [bookName, audio, bookFile, currentDate]);

        console.log('Record inserted successfully');
        res.status(200).json({ ok: true, message: 'Record inserted successfully' });
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Perform a query to check if the email and password match a user in the database
    const query = 'SELECT * FROM tbl_user WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // Valid login credentials
                console.log(results[0].id)
                res.json({ message: 'Login successful', user: results[0].id });
            } else {
                // Invalid login credentials
                res.status(401).json({ message: 'Invalid email or password' });
            }
        }
    });
});
app.get('/getBookData', async (req, res) => {
    try {
        // Assuming you have a query function for executing SQL queries
        const travelDataQuery = 'SELECT * FROM tbl_data';
        const bookData = await query(travelDataQuery);

        // Send the fetched travel data as a response
        res.status(200).json({ ok: true, bookData });
    } catch (error) {
        console.error('Error fetching book data:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});
function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
