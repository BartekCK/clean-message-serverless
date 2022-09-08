import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const postMessage = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const message = process.env.MESSAGE;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message,
    }),
  };
};
