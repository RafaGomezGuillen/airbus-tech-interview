from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.order import Order

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    """Get all orders with related aircraft and material details."""
    
    orders = db.query(Order).all()
    return [
        {
            "aircraft_serial": o.aircraft.serial_number,
            "aircraft_model": o.aircraft.model,
            "material_pn": o.material.pn,
            "material_name": o.material.name,
            "arrival_date": o.arrival_date,
            "status": o.status,
        }
        for o in orders
    ]
