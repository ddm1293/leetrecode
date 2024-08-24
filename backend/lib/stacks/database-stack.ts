import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import {
    AttributeType,
    BillingMode,
    Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DatabaseStack extends Stack {
    public readonly userTable: Table;
    public readonly questionTable: Table;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.userTable = new Table(this, 'UserTable', {
            partitionKey: {
                name: 'PK',
                type: AttributeType.STRING
            },
            sortKey: {
                name: 'SK',
                type: AttributeType.STRING
            },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        this.userTable.addGlobalSecondaryIndex({
            indexName: 'GSI1',
            partitionKey: {
                name: 'GSI1_PK',
                type: AttributeType.STRING,
            },
            sortKey: {
                name: 'GSI1_SK',
                type: AttributeType.STRING,
            }
        });
    }
}
