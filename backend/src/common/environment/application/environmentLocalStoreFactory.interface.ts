import { EnvironmentProps } from "./enviromentProps.interface";

export interface IEnvironmentLocalStoreFactory {
  getEnvProps(): Promise<EnvironmentProps>;
}
