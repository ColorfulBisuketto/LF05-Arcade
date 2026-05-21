import time

from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db, ScoreEntry

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///game.db"

def init_db(_app):
    db.init_app(_app)
    with _app.app_context():
        db.create_all()

@app.post("/api/game/submit")
def submit_score():
    data = request.get_json()
    username = data.get("username", "").strip()
    score = data.get("score", 0)

    if not username or score <= 0:
        return jsonify({
            "error": "invalid score"
        }), 400

    entry = ScoreEntry(
        username=username,
        score=score,
        timestamp=int(time.time() * 1000) # We want to store time in full milliseconds
    )

    db.session.add(entry)
    db.session.commit()

    return jsonify({
        "status": "ok"
    })

@app.get("/api/game/leaderboard")
def get_leaderboard():
    entries = db.session.scalars(db.select(ScoreEntry).order_by(ScoreEntry.score.desc())).all()
    scores = []
    for entry in entries:
        score_dict = entry.to_dict()
        scores.append(score_dict)

    return jsonify({
        "scores": scores
    })

@app.delete("/api/game/leaderboard")
def clear_leaderboard():
    db.session.execute(db.delete(ScoreEntry))
    db.session.commit()
    return jsonify({
        "status": "ok"
    })

if __name__ == "__main__":
    init_db(app)
    app.run(
        host="localhost",
        port=5000,
        debug=True
    )