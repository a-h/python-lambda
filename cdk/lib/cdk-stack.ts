import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as python from '@aws-cdk/aws-lambda-python-alpha';
import { Architecture, DockerImageCode, DockerImageFunction, FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { CfnOutput } from 'aws-cdk-lib';

export class PythonLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Zip-based Lambda function.
    const zipFunction = new python.PythonFunction(this, "zip-function", {
      entry: path.join(__dirname, '../../functions/test-function'),
      runtime: Runtime.PYTHON_3_8,
    })
    const zipUrl = zipFunction.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })
    new CfnOutput(this, "zip-function-url", {
      value: zipUrl.url,
    })

    // Docker-based Lambda function.
    const dockerFunction = new DockerImageFunction(this, "docker-function", {
      architecture: Architecture.ARM_64,
      code: DockerImageCode.fromImageAsset(path.join(__dirname, '../../functions/test-function')),
    })
    const dockerUrl = dockerFunction.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })
    new CfnOutput(this, "docker-function-url", {
      value: dockerUrl.url,
    })
  }
}

