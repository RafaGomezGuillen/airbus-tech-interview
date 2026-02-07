from pydantic import BaseModel

class MaterialOut(BaseModel):
    pn: str
    name: str
    type: str
    weight: int

    class Config:
        from_attributes = True
