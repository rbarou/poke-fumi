"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (app) => {
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
        res.status(200).send("Hello from match service ! ");
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map