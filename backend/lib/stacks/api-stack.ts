import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

interface ApiStackProps extends StackProps {
  table: ITable;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: ApiStackProps) {
    super(scope, id, props);

  }
}
