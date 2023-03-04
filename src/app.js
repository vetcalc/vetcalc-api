import express from 'express';
import cors from 'cors';

import swagger_ui from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

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
app.use(cors()); // neeeded for programmtic acces in frontend

app.use(express.urlencoded({extended: true})); // for application/x-www-form-urlencoded
app.use(express.json()); // for application/json

app.use(auth);

app.use('/animals', animals);
app.use('/concentrations', concentrations);
app.use('/delivery', delivery);
app.use('/dosages', dosages);
app.use('/drugs', drugs);
app.use('/methods', methods);
app.use('/units', units);

const file = fs.readFileSync("swagger.yaml", "utf8");
const swagger_document = YAML.parse(file)
const swagger_options = {
    swaggerOptions: {
        defaultModelRendering: 'model'
    }
};
app.use('/api-docs', swagger_ui.serve, swagger_ui.setup(swagger_document, swagger_options));

app.use(error);

export default app;

