#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from flask_marshmallow import Marshmallow

# Local imports
from config import app, db, api
# Add your model imports
from models import Employee, Task, Department
from models import employees_schema, employee_schema, tasks_schema, task_schema

# Views go here!


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


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

        db.session.add(new_employee)
        db.session.commit()
        response_dict = new_employee.to_dict()
        response = make_response(
            response_dict,
            201,
        )
        return response


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
        for attr in request.form:
            setattr(employee, attr, request.form[attr])
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
        response = make_response("Redcord Deleted seccessfully", 204)
        return response


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
        for attr in request.form:
            setattr(task, attr, request.form[attr])
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)
