const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

module.exports = {
    get: function (params) {
        return client.get(params).promise();
    },
    put: function (params) {
        return client.put(params).promise();
    },
    query: function (params) {
        return client.query(params).promise();
    },
    update: function (params) {
        return client.update(params).promise();
    },
    delete: function (params) {
        return client.delete(params).promise();
    }
};
