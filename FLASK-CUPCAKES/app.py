from typing import AsyncGenerator
from flask import *
from flask_debugtoolbar import *
from models import *

from forms import *

from werkzeug.utils import *

import os

app = Flask(__name__)
app.config["SECRET_KEY"] = "oh-so-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///cupcakes_db"#flask_wtforms"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

UPLOAD_FOLDER = '/static/images'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

toolbar = DebugToolbarExtension(app)
app.debug = True

db.app=(app)
db.init_app(app)
db.create_all()

connect_db(app)

@app.route('/')
def home_page():
    return render_template('/cupcakes/index.html')


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return redirect('/')

@app.route('/api/cupcakes')
def get_all_cupcakes():
    '''show all cupcakes'''
    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]
    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes', methods=["POST"])
def add_cupcake():
    '''create a new cupcake'''
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json['image']
    new_cupcake = Cupcake(  flavor=flavor,
                            size=size,
                            rating=rating,
                            image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    serialized = new_cupcake.serialize()
    return (jsonify(cupcake=serialized),201)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    '''get single cupcake'''
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()
    return(jsonify(cupcake=serialized),200)

@app.route('/api/cupcakes/<int:cupcake_id>',methods=['PATCH'])
def patch_cupcake(cupcake_id):
    '''patch cupcake'''
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json['flavor']
    cupcake.size = request.json['size']
    cupcake.rating = request.json['rating']
    cupcake.image = request.json['image']
    db.session.add(cupcake)
    db.session.commit()
    serialized = cupcake.serialize()
    return(jsonify(cupcake=serialized),200)



