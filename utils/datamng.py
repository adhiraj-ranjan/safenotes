import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import time
from uuid import uuid4
from os import environ
from json import loads
from base64 import b64decode

CREDS = loads(b64decode(environ['token']).decode())

cred = credentials.Certificate(CREDS)
firebase_admin.initialize_app(cred, {
    "databaseURL":"https://safenotes-a13be-default-rtdb.asia-southeast1.firebasedatabase.app/"
    })

user = db.reference("/users")
token = db.reference("/tokens")

def new_user(uname, passwd):
    if uname not in user.get().keys():
        user.update({uname: {"password": passwd, "id": int(time.time()), "last_viewed": "story"}})
        create_note(fname="story", uname=uname)
        save_data(fname="story", data="             It was a dark and stormy night...", uname=uname)
        return {"created": True, "response": "signup successfully"}
    else:
        return {"created": False, "response": "username already taken"}


def validate_user(uname, passwd):
    if uname in user.get().keys():
        if passwd == user.child(uname).get()['password']:
            sessionToken = str(uuid4())
            token.update({sessionToken: uname})
            return {"authenticated": True, "response": "logged in success", "authtoken": sessionToken}
        else:
            return {"authenticated": False, "response": "password incorrect"}
    else:
        return {"authenticated": False, "response": "user not found"}

def get_username(sToken):
    tokens = token.get()
    if sToken in tokens.keys():
        return tokens[sToken]
    else:
        return False

def get_notes_titles(sToken=None, uname=None):
    if not uname:
        uname = get_username(sToken=sToken)
        if not uname:
            return None

    noteTls = user.child(uname).child("notes").get()
    if not noteTls:
        return []
    else:
        return noteTls.keys()

def create_note(fname, sToken=None, uname=None):
    if not uname:
        uname = get_username(sToken=sToken)
        if not uname:
            return {"created": False, "response": "NOTE WAS NOT CREATED"}

    if fname not in get_notes_titles(uname=uname):
        note = user.child(uname).child("notes")
        note.update({fname: ""})
        return {"created": True}
    else:
        return {"created": False, "response": "NOTE WITH THE NAME ALREADY EXISTS"}

def delete_note(sToken, fname):
    uname = get_username(sToken=sToken)
    if not uname:
        return {"deleted": False}

    if fname in get_notes_titles(uname=uname):
        note = user.child(uname).child("notes")
        note.child(fname).delete()
        return {"deleted": True}
    else:
        return {"deleted": False}

def get_data(sToken, fname):
    uname = get_username(sToken=sToken)
    if not uname:
        return {"status": "fail", "data": "not found"}
    
    data = user.child(uname).child("notes").child(fname).get()
    if data == "" or data:
        user.child(uname).update({"last_viewed": fname})
        return {"status": "ok", "data": data}
    else:
        return {"status": "fail", "data": "not found"}

def save_data(fname, data, sToken=None, uname=None):
    if not uname:
        uname = get_username(sToken=sToken)
        if not uname:
            return {"status": "fail", "response": "data not saved"}
    
    note = user.child(uname).child("notes")
    note.update({fname: data})
    return {"status": "ok", "response": "data saved!"}

def get_user_logs(sToken):
    uname = get_username(sToken=sToken)
    if not uname:
        return {"status": "fail", "last_viewed": "", "value": ""}

    last_note = user.child(uname).get()['last_viewed']
    if last_note in get_notes_titles(uname=uname):
        return {"last_viewed": last_note, "value": user.child(uname).child("notes").child(last_note).get()}
    else:
        return {"last_viewed": "", "value": ""}

def logout(sToken):
    if sToken:
        token.child(sToken).delete()
        return {"logged_out": True}
    else:
        return {"logged_out": False, "response": "token not found"}
