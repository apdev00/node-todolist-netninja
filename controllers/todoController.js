var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://user:pw@ds131905.mlab.com:31905/todo');

// create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var TodoModel = mongoose.model('Todo', todoSchema);

// var itemOne = TodoModel({
//     item: 'get beer'
// }).save(function(err) {
//     if (err){
//         throw error;
//     }
//     console.log('item saved');
// });

var urlencodedParser = bodyParser.urlencoded({extended: false});

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'do laundry'}];

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        // get data from mongodb and pass it to view
        TodoModel.find({}, function(err, data){
            if (err){
                throw err;
            }
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        // get data from view and add it to mongodb
        var newTodo = TodoModel(req.body).save(function(err, data){
            if (err){
                throw err;
            }
            //res.json(data);
            res.render('todo', {todos: data});
        });
    });

    app.delete('/todo/:item', function(req, res) {
        // delete the requested item from mongodb
        TodoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err){
                throw err;
            }
            //res.json(data);
            res.render('todo', {todos: data});
        });
    });

};
