# ---------------------------------------------------------
# FastAPI backend: frontend se data leta hai, XGBoost model
# se price predict karta hai aur wapas bhejta hai.
# ---------------------------------------------------------
import json
import pandas as pd
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from xgboost import XGBRegressor

app = FastAPI(title="Indian House Price Predictor")

# Notebook me jo model aur columns save kiye the, unhe load karo
model = XGBRegressor()
model.load_model("xgb_model.json")

columns_file = open("model_columns.json")
model_columns = json.load(columns_file)
columns_file.close()

# HTML/CSS/JS files "static" folder se serve hongi
app.mount("/static", StaticFiles(directory="static"), name="static")


# Frontend se jo data aayega uska format (notebook ke columns jaisa)
class HouseInput(BaseModel):
    City: str
    Property_Type: str
    BHK: int
    Size_in_SqFt: int
    Furnished_Status: str
    Floor_No: int
    Total_Floors: int
    Age_of_Property: int
    Nearby_Schools: int
    Nearby_Hospitals: int
    Public_Transport_Accessibility: str
    Parking_Space: str
    Security: str
    Amenities_Count: int
    Facing: str
    Owner_Type: str
    Availability_Status: str


# Home page
@app.get("/")
def home():
    return FileResponse("static/index.html")


# Render health check
@app.get("/health")
def health():
    return {"status": "ok"}


# Prediction
@app.post("/predict")
def predict(house: HouseInput):
    # 1. Input ko DataFrame me badlo
    new_house = pd.DataFrame([house.model_dump()])

    # 2. Notebook jaisa hi encoding karo
    new_house = pd.get_dummies(new_house, dtype=int)

    # 3. Columns bilkul training jaise same order me lagao (jo missing hain wo 0)
    new_house = new_house.reindex(columns=model_columns, fill_value=0)

    # 4. Price predict karo
    price = model.predict(new_house)[0]

    return {"price_in_lakhs": round(float(price), 2)}
