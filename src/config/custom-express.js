require('marko/node-require').install();
require('marko/express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
app.use('/estatico', express.static('src/app/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride((request, response) => {
    if(request.body && typeof request.body === 'object' && '_method' in request.body){
        let method = request.body._method;
        delete request.body._method;
        return method;
    }
}));
const rotas = require('../app/rotas/rotas');
rotas(app);
module.exports = app;