from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db

# Models go here!

# models.py
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, ma
import bcrypt

# Define the Employee-Task association table
employee_task = db.Table('employee_task',
                         db.Column('employee_id', db.Integer,
                                   db.ForeignKey('employee.id')),
                         db.Column('task_id', db.Integer,
                                   db.ForeignKey('task.id'))
                         )

# Define the Employee-Department association table
employee_department = db.Table('employee_department',
                               db.Column('employee_id', db.Integer,
                                         db.ForeignKey('employee.id')),
                               db.Column('department_id', db.Integer,
                                         db.ForeignKey('department.id'))
                               )

# Define the Employee table
class Employee(db.Model, SerializerMixin):

    serialize_rules = ('-tasks.employee', '-departments.employee',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    username = db.Column(db.String, unique=True)
    admin = db.Column(db.String, default=False)
    clocked_in = db.Column(db.DateTime, server_default=db.func.now())
    clocked_out = db.Column(db.DateTime, onupdate=db.func.now())
    _password_hash = db.Column(db.String)

    tasks = db.relationship('Task', secondary=employee_task,
                            backref=db.backref('employee', lazy='dynamic'))
    departments = db.relationship(
        'Department', secondary=employee_department, backref=db.backref('employees', lazy='dynamic'))

    @hybrid_property  # Restrict access to the password hash.
    def password_hash(self):
        raise Exception("Password hashes may not be viewed.")

    # Generate a Bcrypt password hash and set it to the _password_hash attribute
    @password_hash.setter
    def password_hash(self, password):
        bcrypt_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self._password_hash = bcrypt_hash

    # Check if the provided password matches the one stored in the db
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    # validate username
    @validates('username')
    def validate_username(self, key, address):
        if '@' not in address:
            raise ValueError("failed simple email validation")
        return address

    def __repr__(self):
        return f"Employee {self.username}, ID: {self.id}, Name:{self.name}, Clocked_IN:{self.clocked_in}, Clocked_OUT:{self.clocked_out}"

# Define the Task table
class Task(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)

    def __repr__(self):
        return f"Task {self.name}, ID: {self.id}"

# Define the Department table
class Department(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))

    Task.department = db.relationship('Department', backref='task')

    def __repr__(self):
        return f"Department {self.name}, ID: {self.id}, Task_id: {self.task_id}"

# Employee schema
class EmployeeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'username', 'clocked_in', 'clocked_out')

employee_schema = EmployeeSchema()
employees_schema = EmployeeSchema(many=True)

# # Task schema
# class TaskSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name')

# task_schema = TaskSchema()
# tasks_schema = TaskSchema(many=True)

# # Department schema
# class DepartmentSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name')

# department_schema = DepartmentSchema()
# departments_schema = DepartmentSchema(many=True)



