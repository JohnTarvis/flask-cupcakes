from flask_wtf import *
from wtforms import *
from wtforms.validators import *
from re import *

from flask_wtf.file import * 

class AddCupcakeForm(FlaskForm):
    '''form for adding a cupcake'''



    # name = StringField('Pet Name', validators=[InputRequired()])
    # species = StringField('Pet Species', validators=[InputRequired(),AnyOf(['cat','dog','porcupine'])])
    # age = IntegerField('Age', validators=[InputRequired(),NumberRange(0,30)])
    # notes = StringField('Notes',validators=[Optional()])
    # file = FileField('Photo', validators=[FileAllowed(['txt', 'jpg', 'jpeg', 'png'], 'Images only!')])
