from flask import Flask, make_response
from flask import render_template, request, redirect
from utils import datamng
from waitress import serve

app = Flask(__name__)


@app.route("/index", methods=['GET'])
def index():
    token = request.cookies.get("authtoken")
    if not token:
      return redirect("/")
    files = datamng.get_notes_titles(token)
    if files == None:
      resp = make_response(redirect('/'))
      resp.set_cookie("authtoken")
      return resp

    return render_template('index.html', projects=files)


@app.route("/", methods=['GET'])
def login():
    token = request.cookies.get("authtoken")
    if token:
      return redirect("/index")
    return render_template('login.html')


@app.route("/signup", methods=['GET'])
def signup():
    token = request.cookies.get("authtoken")
    if token:
      return redirect("/index")
    return render_template('signup.html')


@app.route("/api/signup", methods=['POST'])
def __signup():
    username = request.get_json()["username"]
    password = request.get_json()["password"]

    return datamng.new_user(uname=username, passwd=password)


@app.route("/api/signin", methods=['POST'])
def __signin():
    username = request.get_json()["username"]
    password = request.get_json()["password"]

    return datamng.validate_user(uname=username, passwd=password)

@app.route("/api/logout", methods=["POST"])
def __logout():
    token = request.cookies.get("authtoken")
    response = datamng.logout(token)
    resp = make_response(response)
    resp.set_cookie("authtoken")
    return resp

@app.route("/__get_data", methods=['GET'])
def get_data():
    token = request.cookies.get("authtoken")
    file_name = request.args.get("name")
    return datamng.get_data(token, file_name)

@app.route("/api/save_data", methods=['POST'])
def save_data():
    token = request.cookies.get("authtoken")
    file_name = request.get_json()["name"]
    value = request.get_json()["data"]
    return datamng.save_data(fname=file_name, data=value, sToken=token)

@app.route("/__create_file", methods=['GET'])
def create_project():
    token = request.cookies.get("authtoken")
    file_name = request.args.get("name")
    return datamng.create_note(fname=file_name, sToken=token)

@app.route("/__get_logs", methods=['GET'])
def get_logs():
    token = request.cookies.get("authtoken")
    return datamng.get_user_logs(sToken=token)

@app.route("/__delete_file", methods=['GET'])
def delete_project():
    token = request.cookies.get("authtoken")
    file_name = request.args.get("name")
    return datamng.delete_note(token, fname=file_name)



if __name__ == '__main__':
    serve(app, host='0.0.0.0')
