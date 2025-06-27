from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load Gemini API key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

app = Flask(__name__)

# Routes to serve pages

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route("/biology")
def biology():
    return render_template("biology.html")

@app.route("/chemistry")
def chemistry():
    return render_template("chemistry.html")

@app.route("/physics")
def physics():
    return render_template("physics.html")

@app.route("/math")
def math():
    return render_template("math.html")

@app.route("/computer-science")
def computer_science():
    return render_template("computer-science.html")


@app.route('/study-groups')
def study_group_page():
    return render_template('study_groups.html')


# Route for Gemini summary
@app.route("/generate-summary", methods=["POST"])
def generate_summary():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"response": "No prompt provided"}), 400
    try:
        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"}), 500

# Route for Notes Generator
@app.route("/generate-notes", methods=["POST"])
def generate_notes():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"response": "No prompt provided"}), 400
    try:
        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"}), 500

# Route for Quiz Generator
@app.route("/generate-quiz", methods=["POST"])
def generate_quiz():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"response": "No prompt provided"}), 400
    try:
        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"}), 500
    
if __name__ == "__main__":
    app.run(debug=True)
