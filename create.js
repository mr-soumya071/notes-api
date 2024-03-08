const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);
    
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
            noteId: uuid.v1(), // A unique uuid
            content: data.content, // Parsed from request body
            attachment: data.attachment, // Parsed from request body
            createdAt: Date.now(), // Current Unix timestamp
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message }),
        };
    }
}

module.exports = { main };
