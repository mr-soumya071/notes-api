// Import required modules from AWS SDK v3
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { REGION } = process.env; // Make sure to set the region environment variable

// Instantiate DynamoDB client
const client = new DynamoDBClient({ region: REGION, credentials: fromIni() });

// Define main handler function
exports.main = async function(event, context) {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": { S: "123" }, // Update the value to use the correct DynamoDB attribute type
        },
    };

    try {
        // Create QueryCommand with parameters
        const command = new QueryCommand(params);

        // Execute the command
        const response = await client.send(command);

        // Return the matching list of items in response body
        return response.Items;
    } catch (error) {
        // Handle errors
        console.error("Error querying DynamoDB:", error);
        throw error;
    }
};
