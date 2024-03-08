
const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be removed
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
            noteId: event.pathParameters.id, // The id of the note from the path
        },
        };
        
        try {
            await dynamoDb.delete(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({message:"Deleted"}),
            };
        } catch (e) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: e.message }),
            };
        }
    }
    module.exports = { main };