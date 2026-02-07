from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from app.db.base import Base

class Aircraft(Base):
    __tablename__ = "aircrafts"

    serial_number = Column(String, primary_key=True, index=True)
    model = Column(String)
    manufacturer = Column(String)
    capacity = Column(Integer)
    configuration = Column(Integer)

    orders = relationship("Order", back_populates="aircraft")