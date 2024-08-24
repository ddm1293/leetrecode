import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CognitoConstruct } from '../constructs/cognito-construct.js';

export class AuthStack extends Stack {
    public readonly cognito: CognitoConstruct;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.cognito = new CognitoConstruct(this, "LeetReCodeCognitoConstruct")
    }
}
