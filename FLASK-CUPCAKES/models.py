from flask_sqlalchemy import *

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    '''cupcake'''
    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default='http://curric.rithmschool.com/springboard/exercises/flask-cupcakes/_images/cupcake.jpg')

    def serialize(self):
        return {
            'id':self.id,
            'flavor':self.flavor,
            'size':self.size,
            'rating':self.rating,
            'image':self.image
        }



