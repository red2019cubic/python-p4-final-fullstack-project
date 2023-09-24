from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db

# Models go here!

# models.py
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db
import bcrypt

employee_task = db.Table('employee_task',
    db.Column('employee_id', db.Integer, db.ForeignKey('employee.id')),
    db.Column('task_id', db.Integer, db.ForeignKey('task.id'))
)

# Define the Employee-Department association table
employee_department = db.Table('employee_department',
    db.Column('employee_id', db.Integer, db.ForeignKey('employee.id')),
    db.Column('department_id', db.Integer, db.ForeignKey('department.id'))
)

class Employee(db.Model, SerializerMixin):
    

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True)
    admin = db.Column(db.String, default=False)
    clocked_in = db.Column(db.DateTime, server_default=db.func.now())
    clocked_out = db.Column(db.DateTime, onupdate=db.func.now())
    _password_hash = db.Column(db.String)
    
    tasks = db.relationship('Task',secondary=employee_task, backref=db.backref('employees', lazy='dynamic'))
    departments = db.relationship('Department', secondary=employee_department, backref=db.backref('employees', lazy='dynamic'))

    @hybrid_property # Restrict access to the password hash.
    def password_hash(self):
        raise Exception("Password hashes may not be viewed.")

    @password_hash.setter # Generate a Bcrypt password hash and set it to the _password_hash attribute
    def password_hash(self, password):
        bcrypt_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self._password_hash = bcrypt_hash

    def authenticate(self, password): # Check if the provided password matches the one stored in the db
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"Employee {self.username}, ID: {self.id}, Name:{self.name}, Clocked_IN:{self.clocked_in}, Clocked_OUT:{self.clocked_out}"
    
class Task(db.Model, SerializerMixin):
 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    


    def __repr__(self):
        return f"Task {self.task_name}, ID: {self.id}"




class Department(db.Model, SerializerMixin):
    

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)




    def __repr__(self):
        return f"Department {self.dept_title}, ID: {self.id}"


