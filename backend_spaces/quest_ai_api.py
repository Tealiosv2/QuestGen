from flask import Flask, request, jsonify
from flask_cors import CORS
from hugchat import hugchat
from hugchat.login import Login
import uuid

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes
chatbots = {}

@app.route('/login', methods=['POST'])
def init_chatbot():
    # user will pass in their credentials from frontend
    # we will generaate a key zmx201518@gmail.com -> jerrz
    # chatbots[jerrz] = new chatbot()
    # chatbot.login()
    # return 'jerrz',200
    data = request.get_json()
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
        
    return jsonify({'uid': str(new_uid)}), 200

@app.route('/query', methods=['POST'])
def query():
    # user passes in given credential
    # chatbots[credential].prompt(given_message)
    # return response, 200
    if 'uid' not in request.form:
        return 'uid field not in request', 400
    if 'prompt' not in request.form:
        return 'prompt field not in request', 400

    uid = request.form.get('uid')
    prompt = request.form.get('prompt')

    chatbot = chatbots[uid]
    response = chatbot.query(prompt)
    print(response)
    return jsonify({'response': str(response)}), 200

def generate_uid(key: str) -> str:
    # Define a namespace (can be any UUID)
    namespace = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
    # Generate a UUID based on the namespace and the key
    return str(uuid.uuid5(namespace, key))

if __name__ == '__main__':
    app.run(port=5000, debug=True)
