const Bundle = require('./bundle')
function rollup(entery,outputFileName){
     const bundle =new Bundle({entery})
     bundle.build(outputFileName)
}
module.exports = rollup