var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'do laundry'}];

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        console.log(req.body);
        data.push(req.body);
        res.json({todos: data});
    });

    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json({todos: data});
    });

};