var mysql = require('promise-mysql');
var Config = require('./config');

var connection;
exports.init = async function() {
    try {
        console.log("connect mysql begin");
        connection = await mysql.createConnection(Config.db);
        console.log("connect mysql end");
    } catch (error) {
        console.log("connect mysql error:" + error);
    }
}

exports.executeSql = async function(sql, params=null, commit=false) {
    if (connection == null) {
        console.log("Connection is null");
        return;
    }
    try {
        const rows = await connection.query(sql, params);
        if (commit) {
            await connection.commit();
        }
        return rows;
    } catch (error) {
        console.log(error);
    }
}

exports.commit = async function() {
    if (connection == null) {
        console.log("Connection is null");
        return;
    }
    try {
        await connection.commit();
    } catch (error) {
        console.log(error);
    }
}
