import express from 'express';

const app = express();
const port = 3000;
import drugs from './src/routes/drugs.route.js';

app.use('/drugs', drugs);

app.get('/', (req, res) => {
    res.send({"message": "You've reached the vaddb rest api"});
})


// Retrieve all drug information pertaining to a specific animal
app.get('/drugs/:animal_name', (req, res) => {
    const animalName = req.params.animal_name;
    const query = 'SELECT * FROM drug_combinations WHERE animal_name = $1';
    const values = [animalName];
    pool.query(query, values, (error, results) => {
      if (error) {
        res.status(500).send({ error: 'Failed to retrieve data.' });
      } else {
        res.send(results.rows);
      }
    });
  });

// Add entry to drug_combinations table. (skeleton code)
app.post('/add_drug', (req, res) => {
    const { animal_name, drug_name, method, concentration, dosage, notes } = req.body;

    // User input validation
    // check for missing required attributes
    if (!animal_name || !drug_name || !method || !concentration || !dosage) {
        res.status(500).send({ error: 'Missing required attributes.' });
        return;
    }

    // check for invalid data types
    if (typeof animal_name !== 'string' || typeof drug_name !== 'string' || typeof method !== 'string' || typeof concentration !== 'string' || typeof dosage !== 'number') {
        res.status(500).send({ error: 'Invalid data type for attributes.' });
        return;
    }

    // create query to send to database
    const query = 'INSERT INTO drug_combinations(animal_name, drug_name, method, concentration, dosage, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [animal_name, drug_name, method, concentration, dosage, notes];

    pool.query(query, values, (error, results) => {
        if (error) {
            res.status(500).send({ error: 'Failed to insert data.' });
        } else {
            res.send(results.rows[0]);
        }
    })
})

// Delete entry from drug_combinations table. (skeleton)
app.delete('/delete_drug/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM drug_combinations WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to delete drug data.'});
        } else {
            res.send(results);
        }
    })
})

// Modify entry in drug_combinations table. (skeleton)
app.put('/modify_drug/:id', (req, res) => {
    const id = req.params.id;
    // new data to be updated
    const { animal_name, drug_name, method, concentration, dosage, notes } = req.body;

    // User input validation
    // check for invalid data types
    if (typeof animal_name !== 'string' || typeof drug_name !== 'string' || typeof method !== 'string' || typeof concentration !== 'string' || typeof dosage !== 'number') {
        res.status(500).send({ error: 'Invalid data type for attributes.' });
        return;
    }
    
    // create query to send to database
    const query = 'UPDATE drug_combinations SET animal_name = $1, drug_name = $2, method = $3, concentration = $4, dosage = $5, notes = $6 WHERE id = $7';
    const values = [animal_name, drug_name, method, concentration, dosage, notes, id]

    pool.query(query, values, (error, results) => {
        if (error) {
            res.status(500).send({error: 'Failed to update drug data.'});
        } else {
            res.send(results);
        }
    })
})

app.listen(port, () => {
    console.log(`API server running on port ${port}`)
})

