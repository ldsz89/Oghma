var http = require('http');
var port = 3000;
var MongoClient = require('mongodb').MongoClient;
var collectionName = 'dataset';
var qs = require('querystring');


// Successful JSON response
var respond = function(res, code, msg) {
        res.writeHead(code, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "null"
        });
        res.end(JSON.stringify(msg) + '\n');
};


// Communicate with database
var mongo = function(db, callback) {
        MongoClient.connect('mongodb://localhost:27017/' + db, callback);
};


// Process any HTTP body content
var processBody = function(req, callback) {
        var body = '';
        req.on('data', function(data) {
                body += data;
                if (body.length > 1e6) req.connection.destroy();
        });
        req.on('end', function() { callback(qs.parse(body)); });
        
};


// HTTP Server
http.createServer(function(req, res) {
    
        console.dir("Req url: "+req.url); 

        var apiURL = req.url.split('/');
        
        console.dir("apiURL: " + apiURL);  

        // GET: retrieve data
        if (req.method == 'GET' && apiURL[1] == collectionName) {
                mongo('demo', function(err, db) {
                        if (err) respond(res, 500, {"Connection Error": err});
                        
                        var collection = db.collection(apiURL[1]); 
                        var query = (apiURL[2]) ? {Name: apiURL[2]} : {};
                      
                        collection.find(query).toArray(function(err, items) {
                                if (err) respond(res, {"Query Error": err});
                                console.log("Searching for: " + JSON.stringify(query));
                                respond(res, 200, items);
                                db.close();
                        });
                });
        }

        // POST: create data
        else if (req.method == 'POST' && apiURL[1] == collectionName) {
                processBody(req, function(post) {                    
                        mongo('demo', function(err, db) {
                                if (err) respond(res, 500, {"Connection Error": err});
                                
                                var collection = db.collection(apiURL[1]);
                                collection.insert(post, function(err, result) {
                                        if (err) respond(res, 500, {"Insert Error": err});
                                        console.log("Creating: " + JSON.stringify(post));
                                        respond(res, 201, {"Status": "Created"});
                                });
                        });
                });
        }

        // PUT: Update data
        else if (req.method == 'PUT' && apiURL[1] == collectionName) {
                processBody(req, function(body) {
                        mongo('demo', function(err, db) {
                                if (err) respond(res, 500, {"Connection Error": err});
                                
                                var collection = db.collection(apiURL[1]);
                                var match = (apiURL[2]) ? {Name: apiURL[2]} : {};
                                var update = {$set: body};
                                
                                collection.update(match, update, {w:1}, function(err, result) {
                                        if (err) respond(res, 500, {"Update Error": err});
                                        console.log("Updating: " + JSON.stringify(match) + " to " + JSON.stringify(update));
                                        respond(res, 200, {"Updated": match, "Result": result});
                                });
                        });
                });
        }

        // DELETE: Delete data
        else if (req.method == 'DELETE' && apiURL[1] == collectionName) {
                mongo('demo', function(err, db) {
                        if (err) respond(res, 500, {"Connection Error": err});
                        
                        var collection = db.collection(apiURL[1]);
                        var match = (apiURL[2]) ? {Name: apiURL[2]} : {};
                        
                        collection.remove(match, {w:1}, function(err, result) {
                                if (err) respond(res, 500, {"Delete Error": err});
                                console.log("Deleting " + JSON.stringify(match));
                                respond(res, 200, {"Deleted": match, "Result": result});
                        });
                });
        }
    
        // OPTIONS: Handle preflight request
        else if (req.method == 'OPTIONS') {
                res.writeHead(200, {
                        'Access-Control-Allow-Origin': 'null',
                        'Access-Control-Allow-Methods': 'PUT, DELETE'
                });
                res.end();
        }

        // Else: inform the user that the request was bad
        else {
                respond(res, 400, {"Message": req.url + " is a bad request."});
        }

}).listen(port);