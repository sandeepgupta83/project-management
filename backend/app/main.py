from typing import List
from fastapi import Depends, FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse
from . import models, schemas
from .database import SessionLocal, engine
from .schemas import ProjectBase

models.Base.metadata.create_all(bind=engine)

tags_metadata = [
    {
        "name": "employees",
        "description": "Operations with employees.",
    },
    {
        "name": "projects",
        "description": "Manage Projects.",
        "externalDocs": {
            "description": "Projects external docs",
            "url": "https://abc.test.com/",
        },
    },
]

app = FastAPI(
    openapi_url='/api/v0/openapi.json',
    title='Project Management Web Application',
    description='Project Management App with auto docs for the API and everything',
    version='1.0',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)


# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/")
def main():
    return RedirectResponse(url="/docs/")

# ====== EMPLOYEE API ==========


@app.get("/employee/employee_id/{employee_id}/",
         tags=["employees"],
         response_model=schemas.EmployeeOut,
         status_code=status.HTTP_200_OK)
async def get_employee_by_employee_id(employee_id: str, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@app.get("/employee/", tags=["employees"], response_model=List[schemas.EmployeeOut], status_code=status.HTTP_200_OK)
async def get_employees_list(db: Session = Depends(get_db), skip: int = 0, take: int = 20):
    all_employees = db.query(models.Employee).offset(skip).limit(take).all()
    return all_employees


@app.post("/employee/", tags=["employees"], response_model=schemas.EmployeeOut, status_code=status.HTTP_200_OK)
async def add_employee(employee_in: schemas.EmployeeIn, db: Session = Depends(get_db)):
    employee = models.Employee(full_name=employee_in.full_name,
                               employee_id=employee_in.employee_id,
                               project_id=employee_in.project_id,
                               created_at=employee_in.created_at)
    db.add(employee)
    db.commit()
    eid = employee.id
    db.refresh(employee)
    return {**employee_in.dict(), "id": eid}


# ====== PROJECTS API ==========

@app.get("/project/project_id/{project_id}/", tags=["projects"],
         # response_model=schemas.ProjectOut,
         status_code=status.HTTP_200_OK)
async def get_project_by_project_id(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.project_id == project_id).first()
    print(f"{project} {project.project_id} {project.employees_list}")
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.get("/project/", tags=["projects"],
         response_model=List[schemas.ProjectOut],
         status_code=status.HTTP_200_OK)
async def get_projects_list(db: Session = Depends(get_db), skip: int = 0, limit: int = 20):
    all_projects = db.query(models.Project).offset(skip).limit(limit).all()
    return all_projects


@app.post("/project/", tags=["projects"], response_model=schemas.ProjectOut, status_code=status.HTTP_200_OK)
def add_project(project_in: schemas.ProjectIn, db: Session = Depends(get_db)):
    project = models.Project(project_id=project_in.project_id,
                             name=project_in.name,
                             description=project_in.description,
                             start_date=project_in.start_date)
    db.add(project)
    db.commit()
    project_id = project.project_id
    db.refresh(project)
    return {**project_in.dict(), "project_id": project_id}


@app.patch("/employee/{employee_id}/project/{project_id}",
           tags=["employees"],
           response_model=schemas.EmployeeOut,
           status_code=status.HTTP_200_OK)
def assign_employee_to_project(employee_id: str, project_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()
    employee.employee_id = employee_id
    employee.project_id = project_id
    db.commit()
    return employee


@app.put("/project/{project_id}",
         tags=["projects"],
         response_model=schemas.ProjectOut,
         status_code=status.HTTP_200_OK)
def update_project_or_add_employees_to_project(project_id: int, project_in: ProjectBase, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.project_id == project_id).first()
    project.name = project_in.name
    project.description = project_in.description
    db.commit()
    for p in project_in.employees_list:
        employee = models.Employee(full_name=p.full_name,
                                   employee_id=p.employee_id,
                                   project_id=p.project_id,
                                   created_at=p.created_at)
        db.add(employee)
        db.commit()
    db.refresh(project)
    return project
