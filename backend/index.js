const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apittp = require('./routes/routes');
const router = express.Router();

/* Configuration */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)
app.use(cors({origin: 'http://localhost:4200'}))
app.options('*',cors())
app.use(express.json())
app.use('', apittp)
/** Listen on por 3002 and run server **/
app.listen(3002, () => {
    console.log("Node server running on http://localhost:3002");
});

module.exports = app;