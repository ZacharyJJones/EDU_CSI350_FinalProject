
from api import app, db

with app.app_context():
    db.create_all()

    # Fill with some data ahead of use

    pass