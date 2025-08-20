from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from itsdangerous import URLSafeTimedSerializer
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///auth.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


from flask_cors import CORS
CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_verified = db.Column(db.Boolean, default=False)
    auth_provider = db.Column(db.String(20), default="local")

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(email=email, password_hash=hashed_pw)
    db.session.add(user)
    db.session.commit()

    token = serializer.dumps(email, salt='email-confirm')
    print(f"[DEBUG] Verification link: http://localhost:5000/verify/{token}")

    return jsonify({'message': 'User registered. Check your email to verify account.'}), 201

@app.route('/verify/<token>', methods=['GET'])
def verify_email(token):
    try:
        email = serializer.loads(token, salt='email-confirm', max_age=3600)
        user = User.query.filter_by(email=email).first()
        if user:
            user.is_verified = True
            db.session.commit()
            return jsonify({'message': 'Email verified successfully'}), 200
        return jsonify({'error': 'Invalid user'}), 400
    except Exception:
        return jsonify({'error': 'Invalid or expired token'}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email, auth_provider='local').first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    if not user.is_verified:
        return jsonify({'error': 'Please verify your email'}), 403

    return jsonify({'message': 'Login successful'}), 200

@app.route('/auth/google', methods=['POST'])
def google_auth():
    data = request.get_json()
    token = data.get('token')
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


    try:
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), GOOGLE_CLIENT_ID)
        email = idinfo['email']
        user = User.query.filter_by(email=email, auth_provider='google').first()
        if not user:
            user = User(email=email, is_verified=True, auth_provider='google')
            db.session.add(user)
            db.session.commit()
        return jsonify({'message': 'Google login successful'}), 200
    except Exception:
        return jsonify({'error': 'Invalid Google token'}), 400

if __name__ == '__main__':
    if not os.path.exists('auth.db'):
        with app.app_context():
            db.create_all()
            print("✅ Database initialized.")
    app.run(debug=True)
