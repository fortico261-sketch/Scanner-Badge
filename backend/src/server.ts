import "dotenv/config";
const app = require("./app").default || require("./app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
