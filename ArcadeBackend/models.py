from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

"""Leaderboard db model, made up of score entries"""
class ScoreEntry(db.Model):
    __tablename__ = "leaderboard"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.Integer, nullable=False)

    """Helper function to convert a db entry to the needed respone entry"""
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "score": self.score,
            "timestamp": self.timestamp,
        }