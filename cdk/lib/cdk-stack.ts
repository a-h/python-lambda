import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as python from '@aws-cdk/aws-lambda-python-alpha';
import { FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { CfnOutput } from 'aws-cdk-lib';

export class PythonLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const f = new python.PythonFunction(this, 'test-function', {
      entry: path.join(__dirname, '../../functions/test-function'),
      runtime: Runtime.PYTHON_3_8,
    })
    const url = f.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })

    new CfnOutput(this, "function-url", {
      value: url.url,
    })
  }
}

