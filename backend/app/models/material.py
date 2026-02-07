from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from app.db.base import Base


class Material(Base):
    __tablename__ = "materials"

    pn = Column(String, primary_key=True, index=True)
    name = Column(String)
    type = Column(String)
    weight = Column(Integer)

    orders = relationship("Order", back_populates="material")
