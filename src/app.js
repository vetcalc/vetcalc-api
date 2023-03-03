import express from 'express';

import auth from 'middlewares/auth.middleware.js';
import error from 'middlewares/general_error.middleware.js';

import animals from 'routes/animals.route.js';
import concentrations from 'routes/concentrations.route.js';
import delivery from 'routes/delivery.route.js';
import dosages from 'routes/dosages.route.js';
import drugs from 'routes/drugs.route.js';
import methods from 'routes/methods.route.js';
import units from 'routes/units.route.js';

const app = express();

app.use(express.urlencoded({extended: true})); // for application/x-www-form-urlencoded
app.use(express.json()); // for application/json

app.use(auth);

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

app.use(error);

export default app;

