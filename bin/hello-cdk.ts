import * as core from "@aws-cdk/core";

import { HelloCdkStack } from "../lib/hello-cdk-stack";

const app = new core.App();
new HelloCdkStack(app, "HelloCdkStack");
