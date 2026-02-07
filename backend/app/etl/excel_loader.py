import pandas as pd
from sqlalchemy.orm import Session

from app.models.aircraft import Aircraft
from app.models.material import Material
from app.models.order import Order

def load_excel_to_db(file_path: str, db: Session):
    aircraft_df = pd.read_excel(file_path, sheet_name="Aircrafts")
    materials_df = pd.read_excel(file_path, sheet_name="Materials")
    orders_df = pd.read_excel(file_path, sheet_name="Orders")

    # ---------- AIRCRAFTS ----------
    for _, row in aircraft_df.iterrows():
        existing = db.query(Aircraft).filter_by(serial_number=row["Serial Number"]).first()
        if existing:
            existing.model = row["Model"]
            existing.manufacturer = row["Manufacturer"]
            existing.capacity = row["Capacity"]
            existing.configuration = row["Configuration"]
        else:
            db.add(Aircraft(
                serial_number=row["Serial Number"],
                model=row["Model"],
                manufacturer=row["Manufacturer"],
                capacity=row["Capacity"],
                configuration=row["Configuration"],
            ))

    # ---------- MATERIALS ----------
    for _, row in materials_df.iterrows():
        existing = db.query(Material).filter_by(pn=row["PN"]).first()
        if existing:
            existing.name = row["Name"]
            existing.type = row["Type"]
            existing.weight = row["Weight"]
        else:
            db.add(Material(
                pn=row["PN"],
                name=row["Name"],
                type=row["Type"],
                weight=row["Weight"],
            ))

    # ---------- ORDERS ----------
    for _, row in orders_df.iterrows():
        existing = db.query(Order).filter_by(
            aircraft_serial=row["Aircraft Serial Number"],
            material_pn=row["Material PN"],
            arrival_date=pd.to_datetime(row["Arrival Date"]).date()
        ).first()

        if existing:
            existing.status = row["Status"]
        else:
            db.add(Order(
                aircraft_serial=row["Aircraft Serial Number"],
                material_pn=row["Material PN"],
                arrival_date=pd.to_datetime(row["Arrival Date"]).date(),
                status=row["Status"],
            ))

    db.commit()
