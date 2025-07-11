import os
import time
import random
import string
import shutil
import subprocess
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PORT = 5000

# Set upload folder
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Rubric path
RUBRIC_PATH = os.path.abspath('assets/rubric.docx')

def generate_unique_filename(original_filename):
    ext = os.path.splitext(original_filename)[1]
    unique_part = f"{int(time.time())}-{''.join(random.choices(string.ascii_lowercase + string.digits, k=5))}"
    return f"{unique_part}{ext}"

@app.route('/upload', methods=['POST'])
def upload_files():
    try:
        if 'file2' not in request.files or 'file3' not in request.files:
            print('❌ Missing lesson or overview file')
            return 'Please upload both the lesson and course overview files.', 400

        file2 = request.files['file2']
        file3 = request.files['file3']

        # Save files with unique names
        filename2 = generate_unique_filename(file2.filename)
        filename3 = generate_unique_filename(file3.filename)

        lesson_path = os.path.join(UPLOAD_FOLDER, secure_filename(filename2))
        overview_path = os.path.join(UPLOAD_FOLDER, secure_filename(filename3))

        file2.save(lesson_path)
        file3.save(overview_path)

        print('📁 Received files:', RUBRIC_PATH, lesson_path, overview_path)

        # Call python parser.py with rubric, lesson, and overview files
        process = subprocess.Popen(
            ['python', 'parser.py', RUBRIC_PATH, lesson_path, overview_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        output, error_output = process.communicate()
        output = output.decode()
        error_output = error_output.decode()

        # Cleanup uploaded files
        for fp in [lesson_path, overview_path]:
            try:
                os.remove(fp)
            except Exception as e:
                print(f"⚠️ Failed to delete {fp}: {e}")

        if process.returncode != 0:
            print(f"❌ Python exited with code {process.returncode}")
            print(f"🐍 Python stderr: {error_output}")
            return f"Python script failed with code {process.returncode}.\n\n{error_output}", 500

        return output

    except Exception as e:
        print('🔥 Server error:', e)
        return f"Server error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True, port=PORT)
