// This is the entry point of the application. It sets up the server and listens on a specified port.
require('dotenv').config()

const app = require('./src/app');
const connectDB = require('./src/config/database')


connectDB()


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});