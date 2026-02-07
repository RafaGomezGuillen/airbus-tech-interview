from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    aircraft_serial = Column(
        String,
        ForeignKey("aircrafts.serial_number")
    )
    material_pn = Column(
        String,
        ForeignKey("materials.pn")
    )
    arrival_date = Column(Date)
    status = Column(String)

    aircraft = relationship("Aircraft", back_populates="orders")
    material = relationship("Material", back_populates="orders")
