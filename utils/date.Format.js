const moment = require('moment')

const dateformatter = (timeStamp) => {
    // need to look at documentation for date format
    return moment(timeStamp).format('lll')
}

module.exports = dateformatter