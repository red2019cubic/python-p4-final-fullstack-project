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
from models import employees_schema

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
            password_hash=form_json["password_hash"],

        )

        db.session.add(new_employee)
        db.session.commit()
        response = make_response(
            employees_schema.jsonify(new_employee),
            201,
        )
        return response


api.add_resource(Employees, "/employees")


if __name__ == '__main__':
    app.run(port=5555, debug=True)
