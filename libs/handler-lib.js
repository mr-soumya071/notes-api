const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const dynamoDb = new DynamoDBClient({
  region: process.env.region,
  credentials: fromIni(),
});

exports.main = async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: { S: "123" }, // Assuming this is the ID of the author
      noteId: { S: event.pathParameters.id }, // Get the note ID from the request path parameters
    },
  };

  try {
    const command = new GetItemCommand(params);
    const { Item } = await dynamoDb.send(command);

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Note not found" }),
      };
    }

    // Unmarshall the DynamoDB item
    const note = unmarshall(Item);

    return {
      statusCode: 200,
      body: JSON.stringify(note),
    };
  } catch (error) {
    console.error("Error fetching note from DynamoDB:", error);
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }
};
