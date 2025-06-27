from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

@app.route('/generate-summary', methods=['POST'])
def generate_summary():
    video_text = request.json.get("text")
    prompt = f"Summarize the following educational video transcript:\n\n{video_text}"
    try:
        response = model.generate_content(prompt)
        return jsonify({"summary": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-notes', methods=['POST'])
def generate_notes():
    video_text = request.json.get("text")
    prompt = f"Create smart notes from this video:\n\n{video_text}"
    try:
        response = model.generate_content(prompt)
        return jsonify({"notes": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    video_text = request.json.get("text")
    prompt = f"Generate a quiz with 5 MCQs from this educational transcript:\n\n{video_text}"
    try:
        response = model.generate_content(prompt)
        return jsonify({"quiz": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
