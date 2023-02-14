const express  = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`API server running on port ${port}`)
})

// Database credentials
const database = mysql.createConnection({
    host: 'host',
    user: 'user',
    password: 'password',
    database: 'database'
})

//database.connect();     DATABASE NOT YET IMPLEMENTED

app.get('/', (req, res) => {
    res.send('Placeholder landing page.');
})

// Retrieve information from drugs table. (skeleton code)
app.get('/display_drugs', (req, res) => {
    res.send('Drugs page.');
    // PLACEHOLDER CODE BELOW
    database.query('SELECT * FROM drug', (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to retrieve data.'});
        } else {
            res.send(results);
        }
    })
})

// Retrieve information from animals table. (skeleton code)
app.get('/display_animals', (req, res) => {
    res.send('Animals page.');
    // PLACEHOLDER CODE BELOW
    database.query('SELECT * FROM animal', (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to retrieve data.'});
        } else {
            res.send(results);
        }
    })
})

// Add entry to drugs table. (skeleton code)
app.post('/add_drug', (req, res) => {
    const data = 'PLACEHOLDERDATA';
    res.send('Add drug page.');
    dataabase.query('INSERT INTO drug SET ?', data, (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to update drug data.'});
        } else {
            res.send(results);
        }
    })
})

// Add entry to animal table. (skeleton code)
app.post('/add_animal', (req, res) => {
    const data = 'PLACEHOLDERDATA';
    res.send('Add animal page.');
    dataabase.query('INSERT INTO animal SET ?', data, (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to update animal data.'});
        } else {
            res.send(results);
        }
    })
})

// Delete entry from drug table. (skeleton)
app.delete('/delete_drug/:id', (req, res) => {
    const id = req.params.id;
    database.query('DELETE FROM drug WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to delete drug data.'});
        } else {
            res.send(results);
        }
    })
})

// Delete entry from animal table. (skeleton)
app.delete('/delete_animal/:id', (req, res) => {
    const id = req.params.id;
    database.query('DELETE FROM animal WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to delete animal data.'});
        } else {
            res.send(results);
        }
    })
})

// Modify entry in drug table. (skeleton)
app.put('/modify_drug/:id', (req, res) => {
    const id = req.params.id;
    // new data to be updated
    const data = req.body;

    database.query(`UPDATE drug SET ? WHERE id = ${id}`, data, (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to update drug data.'});
        } else {
            res.send(results);
        }
    })
})

// Modify entry in animal table. (skeleton)
app.put('/modify_animal/:id', (req, res) => {
    const id = req.params.id;
    // new data to be updated
    const data = req.body;

    database.query(`UPDATE animal SET ? WHERE id = ${id}`, data, (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to update animal data.'});
        } else {
            res.send(results);
        }
    })
})