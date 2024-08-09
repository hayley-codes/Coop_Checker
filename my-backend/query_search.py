from flask import Flask, request, jsonify
from exa_py import Exa
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

exa = Exa("2234f7b0-0c77-488c-9720-70456ccb5a47")

@app.route('/api/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query')
    postings = data.get('postings', 10)  # Default to 10 if not provided

    response = exa.search(
        query,
        num_results=postings,
        include_domains=["https://www.linkedin.com"],
    )

    results = []
    for result in response.results:
        results.append({
            "title": result.title,
            "url": result.url
        })

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)