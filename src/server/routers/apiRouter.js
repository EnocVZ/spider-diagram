
var express = require('express'),
    router = express();
const testApi = require('../controllers/test');
    

router.get('/', testApi.testApi);

module.exports = router;


