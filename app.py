
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

# Create Flask app
app = Flask(__name__)

# Get Gemini API Key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found. Please check your .env file")

# Configure Gemini
genai.configure(api_key=api_key)

# Gemini Model
model = genai.GenerativeModel("gemini-3.6-flash")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    prompt = data.get("prompt", "")
    function = data.get("function", "")

    full_prompt = f"""
Function: {function}

User Prompt:
{prompt}
"""

    try:
        response = model.generate_content(full_prompt)

        return jsonify({
            "response": response.text
        })

    except Exception as e:
        return jsonify({
            "response": f"Error: {str(e)}"
        })


if __name__ == "__main__":
    app.run(debug=True)