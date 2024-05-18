from hugchat import hugchat
from hugchat.login import Login
from flask import Flask
from dotenv import load_dotenv
import os
load_dotenv()
# app = Flask(__name__)
# @app.route('/')

def chat():

    # LOGIN

    USER_NAME = os.getenv("USER_NAME")
    PASSWORD = os.getenv("PASSWORD")
    cookie_path = os.getenv("COOKIE_PATH")

    sign =  Login(USER_NAME, PASSWORD)
    cookies = sign.login(cookie_dir_path = cookie_path, save_cookies=True)

    # START CHAT
    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
    chatbot.switch_llm(1) # swaps to llama

    # gets a list of all llms
    # llms = chatbot.get_remote_llms()
    # for i in range(len(llms)):
    #     print(llms[i].name)

    conversation_list = chatbot.get_remote_conversations(replace_conversation_list=True)
    print(conversation_list)
    if len(conversation_list) > 0:
        chatbot.change_conversation(conversation_list[0])
    else:
        chatbot.new_conversation(system_prompt="You design d&d quests, answer the user's queries in a detailed and creative manner.")

    query = ''
    while query not in ['Quit', 'quit']:
        query = input("Type here: ")
        for resp in chatbot.query(query, stream=True):
            if resp != None: print(resp['token'], end='') 


if __name__ == "__main__":
    chat()
