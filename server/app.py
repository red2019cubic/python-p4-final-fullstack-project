#!/usr/bin/env python3

# Standard library imports
import random
# Remote library imports
from flask import request, make_response,jsonify
from flask_restful import Resource
from flask_marshmallow import Marshmallow

# Local imports
from config import app, db, api
# Add your model imports
from models import Employee, Task, Department
from models import employees_schema, employee_schema, tasks_schema, task_schema, departments_schema, department_schema

# Views go here!

    

@app.route('/')
def index():
    employees = Employee.query.all()
    result = employee_schema.dump(employees)
    return jsonify(result)


class Employees(Resource):
    
    def get(self):
        employee_list = Employee.query.all()
        response = make_response(employees_schema.jsonify(employee_list),
                                 200,
                                 )

        return response

    def post(self):
        form_json = request.get_json()
        new_employee = Employee(
            name=form_json["name"],
            username=form_json["username"],
            admin=form_json["admin"],
            password_hash=form_json["password_hash"],
        )

        tasks =Task.query.all()
        departments = Department.query.all()
        number = random.randint(0, len(tasks))  
        task_a = tasks[number].name
        department_a = departments[number].name
        new_employee.tasks.append(Task(name=task_a))
        new_employee.departments.append(Department(name=department_a))
        db.session.add(new_employee)
        db.session.commit()
      
        return jsonify({'message': 'Employee added successfully'})


api.add_resource(Employees, "/employees")


class EmployeeByID(Resource):

    def get(self, id):
        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            return {"error": "Employee not found"}, 404
        response = make_response(employee_schema.jsonify(employee), 200)
        return response

    def patch(self, id):
        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            return {"error": "Employee not found"}, 404
        elif 'admin' in request.json:
            employee.admin = request.json['admin']
        elif 'username' in request.json:
            employee.username = request.json['username']
        db.session.add(employee)
        db.session.commit()
        response = make_response(
            employee_schema.jsonify(employee),
            200
        )
        return response

    def delete(self, id):
        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            return {"error": "Employee not found"}, 404
        db.session.delete(employee)
        db.session.commit()
        
        return jsonify({'message': 'Record deleted successfully'})

api.add_resource(EmployeeByID, "/employees/<int:id>")


class Tasks(Resource):
    
    def get(self):
        task_list = Task.query.all()
        response = make_response(tasks_schema.jsonify(task_list),
                                 200,
                                 )

        return response

    def post(self):
        form_json = request.get_json()
        new_task = Task(
            name=form_json["name"],
        )

        db.session.add(new_task)
        db.session.commit()
        response_dict = new_task.to_dict()
        response = make_response(
            response_dict,
            201,
        )
        return response

api.add_resource(Tasks, "/tasks")


class TaskByID(Resource):

    def get(self, id):
        task = Task.query.filter_by(id=id).first()
        if not task:
            return {"error": "Employee not found"}, 404
        response = make_response(task_schema.jsonify(task), 200)
        return response

    def patch(self, id):
        task = Task.query.filter_by(id=id).first()
        if not task:
            return {"error": "Task not found"}, 404
        if 'admin' in request.json:
            task.name = request.json['name']
        db.session.add(task)
        db.session.commit()
        response = make_response(
            task_schema.jsonify(task),
            200
        )
        return response

    def delete(self, id):
        task = Task.query.filter_by(id=id).first()
        if not task:
            return {"error": "Task not found"}, 404
        db.session.delete(task)
        db.session.commit()
        response = make_response("Redcord Deleted seccessfully", 204)
        return response

api.add_resource(TaskByID, "/tasks/<int:id>")

class Departments(Resource):
    
    def get(self):
        dept_list = Department.query.all()
        response = make_response(departments_schema.jsonify(dept_list),
                                 200,
                                 )

        return response

    def post(self):
        form_json = request.get_json()
        new_dept = Department(
            name=form_json["name"],
        )

        db.session.add(new_dept)
        db.session.commit()
        response_dict = new_dept.to_dict()
        response = make_response(
            response_dict,
            201,
        )
        return jsonify({'message': 'Department added successfully'})
    
api.add_resource(Departments, "/departments")

class DepartmentByID(Resource):

    def get(self, id):
        dept = Department.query.filter_by(id=id).first()
        if not dept:
            return {"error": "Employee not found"}, 404
        response = make_response(department_schema.jsonify(dept), 200)
        return response

    def patch(self, id):
        dept = Department.query.filter_by(id=id).first()
        if not dept:
            return {"error": "Task not found"}, 404
        if 'name' in request.json:
            dept.name = request.json['name']

        db.session.add(dept)
        db.session.commit()
        response = make_response(
            task_schema.jsonify(dept),
            200
        )
        return response

    def delete(self, id):
        dept = Department.query.filter_by(id=id).first()
        if not dept:
            return {"error": "Task not found"}, 404
        db.session.delete(dept)
        db.session.commit()
        response = make_response("Redcord Deleted seccessfully", 204)
        return response

api.add_resource(DepartmentByID, "/departments/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

