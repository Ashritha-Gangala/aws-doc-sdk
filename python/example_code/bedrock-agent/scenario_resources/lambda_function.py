import datetime
import json


def lambda_handler(event):
    now = datetime.datetime.now()

    response = {"date": now.strftime("%Y-%m-%d"), "time": now.strftime("%H:%M:%S")}

    response_body = {"application/json": {"body": json.dumps(response)}}

    action_response = {
        "actionGroup": event["actionGroup"],
        "apiPath": event["apiPath"],
        "httpMethod": event["httpMethod"],
        "httpStatusCode": 200,
        "responseBody": response_body,
    }

    session_attributes = event["sessionAttributes"]
    prompt_session_attributes = event["promptSessionAttributes"]

    return {
        "messageVersion": "1.0",
        "response": action_response,
        "sessionAttributes": session_attributes,
        "promptSessionAttributes": prompt_session_attributes,
    }
