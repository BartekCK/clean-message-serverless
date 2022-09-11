import { SSM } from "aws-sdk";
import { IEnvironmentLocalStoreFactory } from "../application/environmentLocalStoreFactory.interface";
import { EnvironmentProps } from "../application/enviromentProps.interface";

export class SsmEnvironment implements IEnvironmentLocalStoreFactory {
  private readonly ssm: SSM;

  constructor(ssm?: SSM) {
    switch (process.env.NODE_ENV) {
      case "development":
        const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

        if (!(AWS_REGION && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY)) {
          throw new Error("Envs for development should exist");
        }

        this.ssm = new SSM({
          region: AWS_REGION,
          credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
          },
        });
        break;

      case "test":
        if (!ssm) {
          throw new Error("SSM instance should be provided for test env");
        }

        this.ssm = ssm;
        break;

      default:
        this.ssm = new SSM();
    }
  }

  getEnvProps = async (): Promise<EnvironmentProps> => {
    const paramsResponse = await this.ssm
      .getParameters({ Names: ["PAYMENT_API_URL"], WithDecryption: true })
      .promise();

    console.log(paramsResponse);

    return {
      paymentApiUrl: "",
    };
  };
}
