from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_orders_status_code():
    response = client.get("/orders/")
    assert response.status_code == 200

def test_get_orders_returns_list():
    response = client.get("/orders/")
    data = response.json()

    assert isinstance(data, list)

def test_order_fields_structure():
    response = client.get("/orders/")
    data = response.json()

    if len(data) == 0:
        return

    order = data[0]

    expected_keys = {
        "aircraft_serial",
        "aircraft_model",
        "material_pn",
        "material_name",
        "arrival_date",
        "status",
    }

    assert expected_keys.issubset(order.keys())

