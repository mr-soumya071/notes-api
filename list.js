// Import required modules from AWS SDK v3
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { REGION } = process.env; // Make sure to set the region environment variable

// Instantiate DynamoDB client
const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: fromIni(),
});

exports.main = async function (event, context) {
  const userId = event.requestContext.identity?.cognitoIdentityId || "";
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": { S: userId },
    },
  };

  console.log(params);

  try {
    // Create QueryCommand with parameters
    const command = new QueryCommand(params);
    console.log(command);

    // Execute the command
    const response = await client.send(command);
    console.log("Hello");
    // Return the matching list of items in response body
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    // Handle errors
    console.error("Error querying DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error querying DynamoDB",
        error,
      }),
    };
  }
};
