from flask import Flask, jsonify, send_from_directory, redirect, session, request
from flask_cors import CORS
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
from pymongo import MongoClient
import os

moderators = ["moderator@hw3.com"]

static_path = os.getenv('STATIC_PATH','static')
template_path = os.getenv('TEMPLATE_PATH','templates')

app = Flask(__name__, static_folder=static_path, template_folder=template_path)
app.secret_key = os.urandom(24)

client = MongoClient("mongodb://root:rootpassword@mongo:27017/?authSource=admin")
# Creates database if it doesn't exist already
db = client["mydatabase"]
# Creates collection if it doesn't exist already
comments_collection = db["comments"]

CORS(app, supports_credentials=True, origins=["http://localhost:5173"], allow_headers=["Content-Type", "Authorization"])

oauth = OAuth(app)
nonce = generate_token()
oauth.register(
    name=os.getenv('OIDC_CLIENT_NAME'),
    client_id=os.getenv('OIDC_CLIENT_ID'),
    client_secret=os.getenv('OIDC_CLIENT_SECRET'),
    #server_metadata_url='http://dex:5556/.well-known/openid-configuration',
    authorization_endpoint="http://localhost:5556/auth",
    token_endpoint="http://dex:5556/token",
    jwks_uri="http://dex:5556/keys",
    userinfo_endpoint="http://dex:5556/userinfo",
    device_authorization_endpoint="http://dex:5556/device/code",
    client_kwargs={'scope': 'openid email profile'}
)

@app.route('/')
def home():
    user = session.get('user')
    if user:
        return f"<h2>Logged in as {user['email']}</h2><a href='/logout'>Logout</a>"
    return '<a href="/login">Login with Dex</a>'

@app.route('/login')
def login():
    session['nonce'] = nonce
    redirect_uri = 'http://localhost:8000/authorize'
    return oauth.flask_app.authorize_redirect(redirect_uri, nonce=nonce)

@app.route('/authorize')
def authorize():
    token = oauth.flask_app.authorize_access_token()
    nonce = session.get('nonce')

    user_info = oauth.flask_app.parse_id_token(token, nonce=nonce)  # or use .get('userinfo').json()
    session['user'] = user_info
    return redirect('http://localhost:5173/')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('http://localhost:5173/')

@app.route('/api/key')
def get_key():
    return jsonify({'apiKey': os.getenv('NYT_API_KEY')})

@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    if path != '' and os.path.exists(os.path.join(static_path,path)):
        return send_from_directory(static_path, path)
    return send_from_directory(template_path, 'index.html')

@app.route('/profile')
def get_user_profile():
    user = session.get('user')

    if user:
        return {
            "signed_in": True,
            "user": user
        }
    return {"signed_in": False}

@app.route('/comments', methods=['GET', 'POST'])
def handle_comments():
    if request.method == 'POST':
        result = comments_collection.insert_one(request.json)
        return jsonify({"result": str(result)}), 201
        
    comments = list(comments_collection.find())
    for comment in comments:
        comment['_id'] = str(comment['_id'])
    return jsonify(comments)

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_ENV') != 'production'
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)),debug=debug_mode)
