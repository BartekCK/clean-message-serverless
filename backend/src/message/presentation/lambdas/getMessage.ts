import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { environmentLocalStore } from "../../../common/environment/application";
import { IMessageEnvironmentLocalStore } from "../../environment/messageEnvironmentLocalStore.interface";

export const getMessage = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const envConfig: IMessageEnvironmentLocalStore = await environmentLocalStore;

  const message = process.env.MESSAGE;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message,
    }),
  };
};
