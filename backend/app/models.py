from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.types import DateTime
from .database import Base
from datetime import datetime


class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    start_date = Column(DateTime, default=datetime.utcnow)
    employees_list = relationship("Employee", back_populates="projects_list")


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    employee_id = Column(String, index=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    projects_list = relationship("Project", back_populates="employees_list")
