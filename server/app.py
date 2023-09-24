#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from flask_marshmallow import Marshmallow

# Local imports
from config import app, db, api
# Add your model imports
from models import Employee, Task, Department


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Employees(Resource):
    def get(self):
        employee_list =Employee.query.all()
        response = make_response(
            employee_list.to_dict(),
            200,
        )

        return response

    # def post(self):
    #     form_json = request.get_json()
    #     new_employee = Employee(
    #         name=form_json["name"],
    #         username=form_json["username"],
    #         password=int(form_json["password"]),

    #     )

    #     db.session.add(new_employee)
    #     db.session.commit()

    #     response_dict = new_employee.to_dict()

    #     response = make_response(
    #         response_dict,
    #         201,
    #     )
    #     return response


api.add_resource(Employees, "/emp")


if __name__ == '__main__':
    app.run(port=5555, debug=True)
