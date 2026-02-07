import shutil
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.etl.excel_loader import load_excel_to_db

router = APIRouter(prefix="/upload", tags=["ETL"])

@router.post("/")
def upload_excel(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload an Excel file and load its data into the database."""

    # Check file type
    if not file.filename or not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="Only .xlsx files are allowed")

    path = f"/tmp/{file.filename}"
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Load into DB
    load_excel_to_db(path, db)
    return {"status": "ETL completed"}
