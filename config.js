configList = {
    global: {
        chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint:'http://bp.cryptolions.io:8888',

        issuer:'eetheetheeth',
        keyProvider:'your private key',

        db: {
            host: 'localhost',
            user: 'mysql user',
            password: 'mysql database',
            database: 'database name'
        },
    },
    test:{
        db:null,//test not use db
        issuer:'testestest',
        keyProvider:'your private key',
        memo:'a airdrop test',
    },
    airdrop :{
        issuer:'eosfavorcomm',
        keyProvider:'your private key',
        memo:'a airdrop memo',
    },
    ad:{
        issuer:'ethsidechain',
        keyProvider:'your private key',
        memo:'a ad memo',
    },
}
const env = process.env.EOSFAVOR_CONFIG_NAME || 'airdrop';
module.exports = {...configList['global'], ...configList[env]};
