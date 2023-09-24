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
    employees_data = [
            {"name": fake.name(),"username": fake.email(), "password":fake.name(), "admin": True, "tasks": ["ICQA Primary", "In-Bound SOUTH"], "departments": ["ICQA", "INDUCT"]},
            {"name": fake.name(),"username": fake.email(), "password":fake.name(), "admin": False,"tasks": ["ICQA SouthWest", "Task 3"], "departments": ["Department 2"]},
            {"name": fake.name(),"username": fake.email(), "password":fake.name(), "admin": True, "tasks": ["ICQA South", "ICQA North"], "departments": ["ICQA", "In-Bound", "Out-Bound"]},
        ]
    for emp_data in employees_data:
        employee = Employee(name=emp_data["name"], username=emp_data["username"],  admin=True)
        employee.password_hash = emp_data["name"]
        for task_name in emp_data["tasks"]:
            task = Task.query.filter_by(name=task_name).first()
            if not task:
                task = Task(name=task_name)
                db.session.add(task)
                employee.tasks.append(task)
            for dept_name in emp_data["departments"]:
                department = Department.query.filter_by(name=dept_name).first()
                if not department:
                    department = Department(name=dept_name)
                    db.session.add(department)
                    employee.departments.append(department)
            db.session.add(employee)
        db.session.commit()
    print("Saving complete...")
