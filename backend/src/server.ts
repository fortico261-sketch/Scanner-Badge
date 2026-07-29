import "dotenv/config";
import "./mqtt";

const app = require("./app").default || require("./app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
