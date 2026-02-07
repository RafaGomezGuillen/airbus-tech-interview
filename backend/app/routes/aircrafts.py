from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.aircraft import Aircraft
from app.schemas.aircraft import AircraftOut

router = APIRouter(prefix="/aircrafts", tags=["Aircrafts"])

@router.get("/", response_model=list[AircraftOut])
def get_aircrafts(db: Session = Depends(get_db)):
    return db.query(Aircraft).all()
