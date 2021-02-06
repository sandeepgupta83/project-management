from datetime import datetime
from random import randint
from typing import List

from pydantic import BaseModel, validator, constr


class EmployeeIn(BaseModel):
    full_name: constr(min_length=3, max_length=50)
    employee_id: str
    project_id: int
    created_at: datetime = None

    class Config:
        orm_mode = True

    @validator('employee_id')
    def emp_id_alphanumeric(cls, e):
        assert e.isalnum(), 'Emp ID must be alphanumeric'
        assert len(e) == 6, 'Emp ID length must be exactly 6 alphanumeric chars'
        return e

    @validator('full_name')
    def full_name_alphabetic(cls, v):
        if not v.isalpha():
            raise ValueError('Full Name should be alphabets only')
        return v


class EmployeeBase(BaseModel):
    full_name: str
    employee_id: str
    created_at: datetime = None


class EmployeeOut(EmployeeBase):
    id: int
    project_id: int

    class Config:
        orm_mode = True


def generate_three_digit_integer_number(n):
    start_range = 10 ** (n - 1)
    end_range = (10 ** n) - 1
    return randint(start_range, end_range)


class ProjectBase(BaseModel):
    name: constr(min_length=10, max_length=80) = "AB1234563875"
    description: constr(min_length=50, max_length=300) = "project description for abc project and " \
                                                         "teams for future company"
    employees_list: List[EmployeeIn] = []


class ProjectIn(ProjectBase):
    project_id: int = generate_three_digit_integer_number(3)
    # name: constr(min_length=10, max_length=80) = "AB1234563875"
    # description: constr(min_length=50, max_length=300) = "project description for abc project and " \
    #                                                      "teams for future company"
    start_date: datetime = None

    class Config:
        orm_mode = True

    @validator('name')
    def name_should_be_alphanumeric(cls, e):
        assert e.isalnum(), 'Project Name must be alphanumeric'
        return e


class ProjectOut(BaseModel):
    project_id: int
    name: str
    description: str = ""
    start_date: datetime = None
    employees_list: List[EmployeeOut] = []

    class Config:
        orm_mode = True
