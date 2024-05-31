from flask import Flask, request, jsonify
from flask_cors import CORS
from hugchat import hugchat
from hugchat.login import Login

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
    if 'username' not in request.form:
        return 'username field not in request', 400
    if 'password' not in request.form:
        return 'password field not in request', 400
    
    username = request.form['username']
    password = request.form['password']

    sign =  Login(username, password)
    cookies = sign.login(cookie_dir_path = './cookies/'+username, save_cookies=True)

    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
    chatbot.switch_llm(1) # swaps to llama
    conversation_list = chatbot.get_remote_conversations(replace_conversation_list=True)
    chatbot.new_conversation(system_prompt="You design d&d quests, answer the user's queries in a detailed and creative manner.")
    chatbots[username] = chatbot
    # return a uid

    return jsonify({'uid': str(username)}), 200

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

if __name__ == '__main__':
    app.run(port=5000, debug=True)
