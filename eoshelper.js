var Config = require('./config');

Eos = require('eosjs')

// Private key or keys (array) provided statically or by way of a function.
// For multiple keys, the get_required_keys API is used (more on that below).
eos = Eos({httpEndpoint:Config.httpEndpoint, chainId:Config.chainId, keyProvider:Config.keyProvider})

exports.EOS = eos
