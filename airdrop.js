var config = require('./config')
var path = require('path')
var curDir = path.resolve(__dirname, '.')
var dbHelper = require('./dbhelper')
var EosHelper = require('./eoshelper');

const topAccounts = [
    'eos',
    'geydmnrzgene',
    'gy4tiobtgene',
    'bijingaaaaaa',
    'gm3doobqgene',
    'godofwealths',
    'gy2dcmjzgige',
    'fuckyoumommm',
    'airdropsdac1',
    'sayyousayme1',
    'wangruixiwww',
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAccounts() {
	if (config.db) {
		let sql = ' select name from accounts where ram > 5 and balance > 200 and issued=0 order by id desc;'
		let accounts = await dbHelper.executeSql(sql);
		return accounts.map(item => item.name)
	} else {
		console.log("top accounts");
		return topAccounts;
	}
}

async function airdrop(memo) {
    console.log("airdrop start")
    if (memo == null) {
        memo = config.memo;
    }
    let accounts = await getAccounts();
    for (let account of accounts) {
        await _airdrop(account, memo)
        await sleep(1000)
    }
    console.log("airdrop finished")
}


async function markDropped(account) {
    let newItem = {
         issued:1,
    }
    let sql = "update accounts set ? where name='" + account + "'";
    try {
        await dbHelper.executeSql(sql, newItem, true);
    } catch (error) {
        throw "update drop error," + error;
    }
}

async function _airdrop(account, memo) {
    if (!account) {
        return false;
    }
    console.log("airdrop to", account)
    try {
        tr = await eos.transaction(eos =>
            {
                eos.transfer(config.issuer, account, '0.0001 EOS', memo)
            }
        )
        await markDropped(account)
        return false;
    } catch (e) {
        console.log("fail", e)
        return false;
    }
    return true;
}

async function start() {
    if (config.db) {
        await dbHelper.init();
     }
    await airdrop(null);
}

start()
