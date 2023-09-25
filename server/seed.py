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
    db.drop_all()
    db.create_all()
    task1 = Task(name='ICQA Primary')
    task2 = Task(name='ICQA North')
    task3 = Task(name='ICQA South')
    task3 = Task(name='ICQA SouthWest')
    task4 = Task(name='ICQA Flat Sort')
    task5 = Task(name='IN-BoundSouth DD230')
    task6 = Task(name='IN-BoundSouth DD235')
    task7 = Task(name='OUT-BoundSouth DD271')
    task8 = Task(name='OUT-BoundSouth DD270')
    task9 = Task(name='OUT-BoundSouth DD243')
    task10 = Task(name='OUT-BoundSouth DD245')
    task11 = Task(name='IN-Duct station 1')

    # Create sample departments
    department1 = Department(name='ICQA')
    department2 = Department(name='INDUCT')
    department3 = Department(name='IN-BOUND SOUTH')
    department4 = Department(name='OUT-BOUND SOUTHWEST')
    department5 = Department(name='OUT-BOUND NORTH')
    department6 = Department(name='IN-BOUND NORTH')
    department7 = Department(name='MANUAL SORT')
    department8 = Department(name='FLAT SORT RUNNER')
    department9 = Department(name='WATER SPIDER')
    department10 = Department(name='JAM CLEANER')

    # Create sample employees and associate them with tasks and departments
    employee1 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task1, task2], departments=[department1])
    employee2 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task11], departments=[department2])
    employee3 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task5, task2], departments=[department3])
    employee4 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task10, task2], departments=[department10])
    employee5 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task1, task2], departments=[department5])
    employee6 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task1, task2], departments=[department1])
    employee7 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task9, task2], departments=[department1])
    employee8 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task3, task2], departments=[department1])
    employee9 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task1, task2], departments=[department1])
    employee10 = Employee(name=fake.name(), username=fake.email(), admin=True,tasks=[task4, task6], departments=[department1])

    Employee.password_hash = fake.name()
    
    # Add objects to the session and commit to the database
    db.session.add_all([task1, task2, task3,task4, task5, task6,task7, task8, task9,task10, task11,department1, department2, department3, department4, department5, department6, department7, department8, department9, department10, employee1, employee2, employee3, employee4, employee5, employee6, employee7, employee8, employee9, employee10])
    db.session.commit()
