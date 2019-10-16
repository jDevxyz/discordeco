const { SQLAdapter } = require('../dist')
const { EventEmitter } = require('events')

describe('SQLAdapter', function() {
    let db
    it('should construct proper SQLAdapter', function(done) {
        db = new SQLAdapter({
            path: 'testpath',
            dbopt: {}, 
            debugger: new EventEmitter(),
            name: 'testname'
        })
        done()
    })
    describe('Testing methods', function() {
    })
})
// gua gak ngerti ini sumpah :v
//wadooo wkwkwkwkwk
