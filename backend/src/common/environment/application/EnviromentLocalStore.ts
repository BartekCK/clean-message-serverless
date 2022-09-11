import { IEnvironmentLocalStoreFactory } from "./environmentLocalStoreFactory.interface";
import { EnvironmentProps } from "./enviromentProps.interface";
import { IMessageEnvironmentLocalStore } from "../../../message/environment/messageEnvironmentLocalStore.interface";

export class EnvironmentLocalStore implements IMessageEnvironmentLocalStore {
  private props: EnvironmentProps;

  private constructor(props: EnvironmentProps) {
    this.props = props;
  }

  public static async create(factory: IEnvironmentLocalStoreFactory) {
    const props = await factory.getEnvProps();

    // Validate envs here

    return new EnvironmentLocalStore(props);
  }

  getPaymentApiUrl(): string {
    return this.props.paymentApiUrl;
  }
}
