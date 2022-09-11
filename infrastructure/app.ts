#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ApiGatewayConstruct } from "./lib/api-gateway.construct";
import { MessageStack } from "./lib/message/message.stack";
import { ParameterStoreStack } from "./lib/parameter-store.stack";
import * as dotenv from "dotenv";

dotenv.config();

const app = new cdk.App();

const restApi = new ApiGatewayConstruct(app, "message-rest-api");
const parameterStore = new ParameterStoreStack(app, "parameter-store");

const messageStack = new MessageStack(app, "message-stack", {
  restApi: restApi.restApi,
  parameters: parameterStore.getParams,
});
