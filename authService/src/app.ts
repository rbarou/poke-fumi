import express from 'express';
import * as routes from './routes.js';

const app = express();
app.use(express.json());
routes.register(app);

export {app};