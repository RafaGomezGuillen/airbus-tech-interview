import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import orders, upload, aircrafts, materials

app = FastAPI(
    title="Aircraft ETL API",
    description="""
    ETL with Python and React
    """,
    version="1.0.0",
    terms_of_service="https://www.airbus.com/en/terms-of-use",
    contact={
      'name': 'Airbus Support',
      'url': 'https://www.airbus.com/en/airbus-contact-us',
      'email': 'support@airbus.com',
    },
)

origins = [
    "http://localhost:5173",  # Development Vite server
    "http://localhost",       # Docker frontend
    "http://localhost:80",    # Docker frontend port
    "http://frontend:80",     # Docker network
    # "http://aircraft.airbus.com",
    # "http://boeingsucks.airbus.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(orders.router)
app.include_router(upload.router)
app.include_router(materials.router)
app.include_router(aircrafts.router)

def run_app():
    print("Starting Aircraft ETL API... \nExecuting on http://127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_config=None)

if __name__ == "__main__":
    run_app()