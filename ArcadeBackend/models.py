from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Define Database models
class ScoreEntry(db.Model):
    __tablename__ = "leaderboard"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.Integer, nullable=False)

    # Define to_dict for easier response generation
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "score": self.score,
            "timestamp": self.timestamp,
        }