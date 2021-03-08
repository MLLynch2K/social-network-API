const moment = require('moment')

const dateformatter = (timeStamp) => {
    return moment(timeStamp).format('LLLL')
}

module.exports = dateformatter