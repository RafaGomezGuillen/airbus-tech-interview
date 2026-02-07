from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_materials():
    response = client.get("/materials/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        m = data[0]
        assert "pn" in m
        assert "name" in m
        assert "type" in m
        assert "weight" in m

def test_get_aircrafts():
    response = client.get("/aircrafts/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        a = data[0]
        assert "serial_number" in a
        assert "model" in a
        assert "manufacturer" in a
        assert "capacity" in a
        assert "configuration" in a
