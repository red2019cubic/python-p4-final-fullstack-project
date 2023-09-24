from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import dt

from config import db

# Models go here!

# models.py
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class Employee(db.Model, SerializerMixin):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True)
    clocked_in = db.Column(db.DateTime, default=dt.utcnow())
    clocked_out = db.Column(db.DateTime, default=dt.utcnow())
    _password_hash = db.Column(db.String)

    @hybrid_property # Restrict access to the password hash.
    def password_hash(self):
        raise Exception("Password hashes may not be viewed.")

    @password_hash.setter # Generate a Bcrypt password hash and set it to the _password_hash attribute
    def password_hash(self, password):
        bcrypt_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        self._password_hash = bcrypt_hash

    def authenticate(self, password): # Check if the provided password matches the one stored in the db
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"Employee {self.username}, ID: {self.id}, Name:{self.name}, Clocked_IN:{self.clocked_in}, Clocked_OUT:{self.clocked_out}"
class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    task_title = db.Column(db.String, nullable=False)


    def __repr__(self):
        return f"Task {self.task_title}, ID: {self.id}"

class Departments(db.Model, SerializerMixin):
    __tablename__ = "departments"

    id = db.Column(db.Integer, primary_key=True)
    dept_title = db.Column(db.String, nullable=False)


    def __repr__(self):
        return f"Departments {self.dept_title}, ID: {self.id}"


