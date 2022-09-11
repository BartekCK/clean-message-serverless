import { Construct } from "constructs";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Stack } from "aws-cdk-lib";

export class ParameterStoreStack extends Stack {
  private readonly parameters: ssm.IParameter[];

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.parameters = [
      new ssm.StringParameter(this, "mySsmParameter", {
        parameterName: "PAYMENT_API_URL",
        stringValue: process.env.PAYMENT_API_URL!,
        type: ssm.ParameterType.STRING,
      }),
    ];
  }

  get getParams(): ssm.IParameter[] {
    return this.parameters;
  }
}
