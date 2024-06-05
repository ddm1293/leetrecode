import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { LambdaFactory } from '../factories/lambda-factory';
import { UserLambdaFactory } from '../factories/user-lambda-factory';

interface ApiStackProps extends StackProps {
  table: ITable;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // TODO: understand RestApi construct
    const api = new RestApi(this, 'MyApi', {
      restApiName: 'Leetrecode api gateway',
      description: 'This service serves my API.',
    });

    this.configureFactory(new UserLambdaFactory(), api, props.table);
  }

  private configureFactory(factory: LambdaFactory, api: RestApi, table: ITable) {
    const lambdas = factory.createLambdas(this, table);
    factory.addRoutes(api, lambdas);
  }
}
