"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const server = app_js_1.app.listen(5001, '0.0.0.0', () => {
    const { port, address } = server.address();
    console.log('Server listening on:', 'http://' + address + ':' + port);
});
//# sourceMappingURL=index.js.map