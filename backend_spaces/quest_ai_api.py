from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes
chatbots = {}

@app.route('/')
def init_chatbot():
    # user will pass in their credentials from frontend
    # we will generaate a key zmx201518@gmail.com -> jerrz
    # chatbots[jerrz] = new chatbot()
    # chatbot.login()
    # return 'jerrz',200
    return "Quest_AI API is running!"

@app.route('/query', methods=['POST'])
def query():
    # user passes in given credential
    # chatbots[credential].prompt(given_message)
    # return response, 200
    data = request.json.get('data')
    print(f'Received data: {data}')
    return jsonify({"message": "some query response", "data": data})

if __name__ == '__main__':
    app.run(port=5000)
