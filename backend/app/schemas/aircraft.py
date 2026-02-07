from pydantic import BaseModel

class AircraftOut(BaseModel):
    serial_number: str
    model: str
    manufacturer: str
    capacity: int
    configuration: int

    class Config:
        from_attributes = True
