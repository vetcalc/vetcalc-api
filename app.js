import express from 'express';

const app = express();
const port = 3000;

import auth from './src/middlewares/auth.middleware.js';

import animals from './src/routes/animals.route.js';
import concentrations from './src/routes/concentrations.route.js';
import delivery from './src/routes/delivery.route.js';
import dosages from './src/routes/dosages.route.js';
import drugs from './src/routes/drugs.route.js';
import methods from './src/routes/methods.route.js';
import units from './src/routes/units.route.js';

app.use('*', auth);

app.get('/', (req, res) => {
    res.send({"message": "You've reached the vaddb rest api"});
})

app.use('/animals', animals);
app.use('/concentrations', concentrations);
app.use('/delivery', delivery);
app.use('/dosages', dosages);
app.use('/drugs', drugs);
app.use('/methods', methods);
app.use('/units', units);

app.listen(port, () => {
    console.log(`API server running on port ${port}`)
})

