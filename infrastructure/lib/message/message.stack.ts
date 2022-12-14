import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { IParameter } from "aws-cdk-lib/aws-ssm";

export interface MessageStackProps {
  restApi: RestApi;
  parameters: IParameter[];
}

export class MessageStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    { restApi, parameters }: MessageStackProps
  ) {
    super(scope, id);

    const getMessageQuery = new Function(this, "getMessageLambda", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "../../../backend/dist/message/presentation/lambdas"
        )
      ),
      runtime: Runtime.NODEJS_16_X,
      handler: "getMessage.getMessage",
      environment: {
        MESSAGE: "New message hello GET",
      },
    });

    const postMessageQuery = new Function(this, "postMessageLambda", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "../../../backend/dist/message/presentation/lambdas"
        )
      ),
      runtime: Runtime.NODEJS_16_X,
      handler: "postMessage.postMessage",
      environment: {
        MESSAGE: "POST hello POST",
      },
    });

    parameters.forEach((param) => {
      param.grantRead(getMessageQuery);
      param.grantRead(postMessageQuery);
    });

    restApi.root
      .resourceForPath("message")
      .addMethod("GET", new LambdaIntegration(getMessageQuery));

    restApi.root
      .resourceForPath("message")
      .addMethod("POST", new LambdaIntegration(postMessageQuery));
  }
}
