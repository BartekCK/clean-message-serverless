import { Construct } from "constructs";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Stack } from "aws-cdk-lib";

export class ApiGatewayConstruct extends Stack {
  private readonly _restApi: RestApi;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this._restApi = new RestApi(this, "message-rest-api");
  }

  get restApi(): RestApi {
    return this._restApi;
  }
}
