import json
import boto3
import numpy

def handler(event, context):
    s3 = boto3.resource('s3')
    arr = numpy.array([1, 2, 3, 4, 5])
    print(arr)
    print('request: {}'.format(json.dumps(event)))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/plain'
        },
        'body': 'Hello, CDK! You have hit {}\n'.format(event['rawPath'])
    }
