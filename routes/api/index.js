const router = require('express').Router()

// import API routes
const apiRoutes = require('./api')

// add prefix `/api` to api routes imported
router.use('/', apiRoutes)

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router