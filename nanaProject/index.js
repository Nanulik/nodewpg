const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'project';
const collectionName = 'users';

// Creating routes for pages
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home', function(request, response){
    response.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/insert', (request, response) => {
    MongoClient.connect(mongoUrl, (connectError, client) => {
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        const user = { name: 'Nana', password: '12345' };

        collection.insertOne(user, (insertUserError, result) => {
            response.send('Hi');     
        });
    });
})

app.listen(port, function(){
    console.log(`server running on port ${port}`);
});
