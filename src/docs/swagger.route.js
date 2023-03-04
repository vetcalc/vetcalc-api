import express from 'express';
import swagger_ui from 'swagger-ui-express';
import swagger_jsdoc from 'swagger-jsdoc';
import fs from 'fs';
import YAML from 'yaml';

const router = express.Router();


// using yaml for the options as opposed to the default json
const file = fs.readFileSync("./src/docs/swagger_spec_options.yaml", "utf8");
const swagger_spec_options = YAML.parse(file);

const jsdoc_options = {
    definition: {
        ...swagger_spec_options,
    },
    apis: ['./src/routes/*.route.js']
};

const swagger_ui_options = {
    swaggerOptions: {
        defaultModelRendering: 'model'
    }
};

const swagger_document = swagger_jsdoc(jsdoc_options);

router.use('/', swagger_ui.serve);
router.get('/', swagger_ui.setup(swagger_document, swagger_ui_options));

export default router;
