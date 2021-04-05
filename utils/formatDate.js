const moment = require('moment');
const formatDate = function(rawDate) {
    return moment(rawDate).format("MMMM Do YYYY, h:mm a")
}
module.exports = formatDate