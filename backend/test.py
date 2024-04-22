import json
from openai import AzureOpenAI

client = AzureOpenAI(
    azure_endpoint="https://hybridatelierourcs.openai.azure.com/",
    api_key="cbb1930b22c44815aa3af29f5ed53c22",
    api_version="2024-02-15-preview"
)
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
    {"role": "user", "content": "weakest pokemon; limit 1"}
]
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

print(json.loads(completion.choices[0].message.content))