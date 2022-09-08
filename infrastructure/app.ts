#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ApiGatewayConstruct } from "./lib/api-gateway.construct";
import { MessageStack } from "./lib/message/message.stack";

const app = new cdk.App();

const restApi = new ApiGatewayConstruct(app, "message-rest-api");
const messageStack = new MessageStack(app, "message-stack", {
  restApi: restApi.restApi,
});
