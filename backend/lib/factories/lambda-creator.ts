import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface LambdaConfig extends NodejsFunctionProps {
  id: string;
}

export class LambdaCreator {
  static createLambda(scope: Construct, config: LambdaConfig): NodejsFunction {
    return new NodejsFunction(scope, config.id, config);
  }
}
