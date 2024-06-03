from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from hugchat import hugchat
from hugchat.login import Login
import uuid

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)  # This will enable CORS for all routes
chatbots = {}

@app.route('/login', methods=['POST'])
def init_chatbot():
    # user will pass in their credentials from frontend
    # we will generaate a key zmx201518@gmail.com -> jerrz
    # chatbots[jerrz] = new chatbot()
    # chatbot.login()
    # return 'jerrz',200
    data = request.get_json()
    if 'username' not in data:
        return jsonify({'error': 'username not found'}), 400
    if 'password' not in data:
        return jsonify({'error': 'password not found'}), 400
    username = data['username']
    password = data['password']
    

    sign =  Login(username, password)
    cookies = sign.login(cookie_dir_path = './cookies/'+username, save_cookies=True)

    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
    chatbot.switch_llm(1) # swaps to llama
    conversation_list = chatbot.get_remote_conversations(replace_conversation_list=True)
    chatbot.new_conversation(system_prompt="You design d&d quests, answer the user's queries in a detailed and creative manner.")

    new_uid = generate_uid(username)

    if new_uid not in chatbots:
        chatbots[new_uid] = chatbot


    response = make_response(jsonify({'uid': str(new_uid)}))
    response.set_cookie('uid', new_uid)
        
    return response, 200

@app.route('/query', methods=['POST'])
def query():
    # Get the JSON data from the request body
    data = request.get_json()
    print(data)

    # Check if 'prompt' is present in the JSON data
    if 'prompt' not in data:
        return jsonify({'error': 'prompt not found'}), 400

    # Check if 'uid' cookie exists
    
    if 'cookie' not in data:
        return jsonify({'error': 'uid cookie not found'}), 400

    # Get the prompt from the JSON data
    prompt = data['prompt']
    uid = data['cookie']
    
    # Get the chatbot associated with the uid
    chatbot = chatbots.get(uid)
    if not chatbot:
        return jsonify({'error': 'Chatbot not found'}), 404

    # Query the chatbot and return the response
    response = chatbot.query(prompt)
    print('running for ', uid)
    return jsonify({'response': str(response)}), 200

@app.route('/logout', methods=['POST'])
def logout():
    if 'uid' not in request.cookies:
        return jsonify({'error': 'uid not found'}), 400
    uid = request.cookies.get('uid')
    if uid in chatbots:
        del chatbots[uid]
    response = make_response(jsonify({'message': 'logout successful'}))
    response.set_cookie('uid', '', expires=0)
    return response, 200


def generate_uid(key: str) -> str:
    # Define a namespace (can be any UUID)
    namespace = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
    # Generate a UUID based on the namespace and the key
    return str(uuid.uuid5(namespace, key))

if __name__ == '__main__':
    app.run(port=5000, debug=True)
