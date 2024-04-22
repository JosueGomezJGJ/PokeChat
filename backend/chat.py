from flask import Flask, request, send_file, jsonify, Response
from flask_cors import CORS
from openai import AzureOpenAI
import json, os

app = Flask(__name__)
CORS(app)
client = AzureOpenAI(
    azure_endpoint="https://hybridatelierourcs.openai.azure.com/",
    api_key="cbb1930b22c44815aa3af29f5ed53c22",
    api_version="2024-02-15-preview"
)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/chat/hello', methods=['GET'])
def hello():
    return "Hello, World!"

@app.route('/chat/query', methods=['GET'])
def strongest():
    query = request.args.get('q', 'ditto limit 1')
    print(query)
    message_text = [
        {
            "role": "system",
            "content": "You are a backend API and respond to queries with JSON messages. You only respond with an array of JSON objects."
        },
        {
            "role": "user",
            "content": "Strongest pokemon"
        },
        {
            "role": "assistant",
            "content": "[\n{\n\"name\": \"Arceus\",\n\"id\": 493\n},\n{\n\"name\": \"Mewtwo\",\n\"id\": 150\n}]"
        },
        {"role": "user", "content": f"{query}"}
    ]

    try:
        completion = client.chat.completions.create(
        model="OurCS35", # model = "deployment_name"
        messages = message_text,
        temperature=0.7,
        max_tokens=800,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None
        )

        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)