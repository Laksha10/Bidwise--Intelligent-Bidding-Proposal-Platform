from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)
CORS(app)  # Allows React/Node to access this

# --- 1. Load the Brain (Shared by both features) ---
print("⏳ Loading AI Model... (This happens only once)")
model = SentenceTransformer('all-mpnet-base-v2')
print("✅ AI Model Loaded & Ready!")

# ==========================================
#  FEATURE 1: Smart Notifications
#  (Finds which companies match a new job)
# ==========================================
@app.route('/match_companies', methods=['POST'])
def match_companies():
    data = request.json
    job_desc = data.get('job_desc', "")
    companies = data.get('companies', [])
    threshold = data.get('threshold', 0.35)  # Default sensitivity

    if not companies or not job_desc:
        return jsonify([])

    # 1. Understand the Job
    job_vec = model.encode([job_desc])
    
    results = []
    for company in companies:
        # 2. Build the Company Profile
        # We combine Name + Bio + Skills to get the full picture
        name = company.get('name', '')
        bio = company.get('bio', '')
        skills = company.get('skills', '')
        full_text = f"{name} {bio} {skills}"
        
        # 3. Compare
        company_vec = model.encode([full_text])
        score = float(cosine_similarity(job_vec, company_vec)[0][0])
        
        # 4. Decide
        should_notify = score >= threshold
        status = "✅ Notify" if should_notify else "❌ Ignore"
        
        results.append({
            "id": company.get('id'),
            "name": name,
            "score": round(score, 3),
            "status": status,
            "should_notify": should_notify
        })

    # Sort best matches first
    results.sort(key=lambda x: x['score'], reverse=True)
    
    return jsonify(results)


# ==========================================
#  FEATURE 2: Bid Analysis (V4 Engine)
#  (Ranks bids based on Quality + Price + Trust)
# ==========================================
W_TEXT = 0.60
W_PRICE = 0.20
W_TRUST = 0.20

@app.route('/analyze_bids', methods=['POST'])
def analyze_bids():
    data = request.json
    job_desc = data.get('job_desc', "")
    project_budget = float(data.get('budget', 0))
    bids = data.get('bids', [])

    if not bids or not job_desc:
        return jsonify([])

    job_vec = model.encode([job_desc])

    ranked_results = []
    for bid in bids:
        # A. Semantic Score
        bid_vec = model.encode([bid.get('text', '')])
        s_text = float(cosine_similarity(job_vec, bid_vec)[0][0])

        # B. Price Logic
        bid_amount = float(bid.get('price', 0))
        rating = float(bid.get('rating', 0))
        
        limit = project_budget * 2.0
        low_threshold = project_budget * 0.20 

        price_note = "Normal"
        s_price = 0.0

        if bid_amount < low_threshold:
            s_price = 0.0
            rating = rating * 0.5  # Trust Penalty for being suspicious
            price_note = "🚨 Suspicious (<20%)"
        elif bid_amount <= project_budget:
            s_price = 1.0
            price_note = "✅ Perfect"
        elif bid_amount >= limit:
            s_price = 0.0
            price_note = "❌ Expensive"
        else:
            s_price = (limit - bid_amount) / (limit - project_budget)
            price_note = "⚠️ Over Budget"

        # C. Trust Score
        raw_rating = 3.5 if rating == 0.0 else rating
        s_trust = raw_rating / 5.0

        # D. Final Score
        final_score = (s_text * W_TEXT) + (s_price * W_PRICE) + (s_trust * W_TRUST)

        ranked_results.append({
            "id": bid.get('id'),
            "score": round(final_score, 4),
            "semantic_score": round(s_text, 2),
            "price_note": price_note,
            "is_suspicious": "Suspicious" in price_note
        })

    ranked_results.sort(key=lambda x: x['score'], reverse=True)
    return jsonify(ranked_results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)