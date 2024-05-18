from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes

@app.route('/')
def home():
    return "Quest_AI API is running!"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json.get('data')
    print(f'Received data: {data}')
    return jsonify({"message": "some query response", "data": data})

if __name__ == '__main__':
    app.run(port=5000)
