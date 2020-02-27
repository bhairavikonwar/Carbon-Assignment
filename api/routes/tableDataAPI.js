var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var data = [{ id: '1', name: 'Henry', role: 'Liscenced user, Subscription Administration', status:'Active' },
{ id: '2', name: 'Billy', role: 'Liscenced user', status:'Active' },
{ id: '3', name: 'Coral', role: 'Subscription Administration', status:'Active' },
{id: '4', name: 'Kate', role: 'Pending', status:'Inactive'}];
let responseData = {data:data}
    res.send(JSON.stringify(responseData));
});

module.exports = router;
