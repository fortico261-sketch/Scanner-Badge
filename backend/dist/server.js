"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app = require("./app").default || require("./app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map