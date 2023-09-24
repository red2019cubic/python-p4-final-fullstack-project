#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker



# Local imports
from app import app
from config import db
from models import Employee, Department, Task, employee_department, employee_task  # Import your SQLAlchemy models

fake = Faker()
with app.app_context():
    # Employee.query.delete()
    # Task.query.delete()
    # Department.query.delete()
    db.create_all()
    print("Starting seed...")

# Create sample data for employees, departments, and tasks
    employees_list = [
            {"name": fake.name(),"username": fake.email(), "password":fake.name(), "admin": False, "tasks": ["ICQA South", "ICQA North","ICQA Primary", "In-Bound SOUTH"], "departments": ["ICQA", "INDUCT"]},
            {"name": fake.name(),"username": fake.email(), "password":fake.name(), "admin": True,"tasks": ["ICQA South", "ICQA North","ICQA SouthWest", "ICQA Primary", "In-Bound SOUTH"], "departments": ["Department 2"]},
            {"name": fake.name(),"username": fake.email(), "password":fake.name(), "admin": False, "tasks": ["ICQA South", "ICQA North","ICQA Primary", "In-Bound SOUTH"], "departments": ["ICQA", "In-Bound", "Out-Bound"]},
        ]
    for emp_data in employees_list:
        employee = Employee(name=emp_data["name"], username=emp_data["username"],  admin=emp_data["admin"])
        employee.password_hash = emp_data["name"]
        db.session.add(employee)
        for task_name in emp_data["tasks"]:
            task = Task.query.filter_by(name=task_name).first()
            db.session.add(task)
            employee.tasks.append(task)
        for dept_name in emp_data["departments"]:
            department = Department.query.filter_by(name=dept_name).first()
            db.session.add(department)
            employee.departments.append(department)
       
    db.session.commit()
    print(Employee.query.filter_by(id=1).all())
    print("Saving complete...")
