import {
    APIGatewayProxyEvent,
    APIGatewayProxyEventHeaders,
    APIGatewayProxyEventQueryStringParameters,
    APIGatewayProxyEventPathParameters,
    APIGatewayProxyEventStageVariables } from 'aws-lambda';

export function createMockEvent(
    body: Record<string, unknown> | null,
    headers?: APIGatewayProxyEventHeaders,
    queryStringParameters?: APIGatewayProxyEventQueryStringParameters,
    pathParameters?: APIGatewayProxyEventPathParameters,
    stageVariables?: APIGatewayProxyEventStageVariables
): APIGatewayProxyEvent {
    return {
        body: body ? JSON.stringify(body) : null,
        headers: headers || {},
        multiValueHeaders: {},
        httpMethod: 'POST',
        isBase64Encoded: false,
        path: '/test-path',
        pathParameters: pathParameters || null,
        queryStringParameters: queryStringParameters || null,
        multiValueQueryStringParameters: null,
        stageVariables: stageVariables || null,
        requestContext: {
            accountId: '123456789012',
            apiId: 'test-api-id',
            authorizer: {},
            httpMethod: 'POST',
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                clientCert: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                principalOrgId: null,
                sourceIp: '127.0.0.1',
                user: null,
                userAgent: 'Custom User Agent String',
                userArn: null,
            },
            path: '/test-path',
            stage: 'test-stage',
            requestId: 'test-request-id',
            requestTimeEpoch: 0,
            resourceId: 'test-resource-id',
            resourcePath: '/test-path',
            protocol: '',
        },
        resource: '/test-path',
    };
}
