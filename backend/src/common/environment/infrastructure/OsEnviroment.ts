import { EnvironmentProps } from "../application/enviromentProps.interface";
import { IEnvironmentLocalStoreFactory } from "../application/environmentLocalStoreFactory.interface";

export class OsEnvironment implements IEnvironmentLocalStoreFactory {
  async getEnvProps(): Promise<EnvironmentProps> {
    return { paymentApiUrl: process.env.PAYMENT_API_URL! };
  }
}
