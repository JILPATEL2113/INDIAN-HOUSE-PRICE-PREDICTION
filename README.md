# Indian House Price Predictor (XGBoost + FastAPI)

## Folder structure

```
house-price-app/
├── house_price_prediction.ipynb   <- model yahan train hota hai
├── main.py                        <- FastAPI backend
├── requirements.txt
├── render.yaml
├── xgb_model.json                 <- notebook chalane ke baad banegi (aapko copy karni hai)
├── model_columns.json             <- notebook chalane ke baad banegi (aapko copy karni hai)
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

## Step 1: Notebook chalao (local)

1. `indian_house_price_prediction_data.csv` ko notebook ke same folder me rakho.
2. Libraries install karo:
   `pip install pandas numpy matplotlib scikit-learn xgboost jupyter`
3. `jupyter notebook` chalao, `house_price_prediction.ipynb` kholo, **Kernel > Restart & Run All**.
4. Last me `xgb_model.json` aur `model_columns.json` banengi. Inhe `house-price-app` folder me rakho
   (agar notebook isi folder me chalaya hai to already wahin hongi).

## Step 2: Local me app test karo

```
pip install -r requirements.txt
uvicorn main:app --reload
```
Browser me kholo: http://127.0.0.1:8000

## Step 3: Render par deploy karo

1. Poora `house-price-app` folder GitHub repo me push karo
   (CSV file mat daalo, 41 MB ki hai aur API ko chahiye nahi. `xgb_model.json` aur `model_columns.json` zaroor daalo).
2. https://render.com par login karo, **New > Web Service**, apni repo select karo.
3. Settings:
   - Runtime: **Python 3**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment variable: `PYTHON_VERSION` = `3.11.9`
   
   (Ya `render.yaml` ke saath **New > Blueprint** use karo, sab automatic set ho jayega.)
4. Deploy dabao. Link milte hi app live.

Free plan par 15 minute idle rehne ke baad app so jata hai, pehli request me 30-60 second lag sakte hain.

## Zaroori note

Dataset synthetic hai (price ka size/city/BHK se koi relation nahi), isliye model ka R2 score lagbhag 0 aata hai
aur prediction lagbhag hamesha average (~250 Lakh) ke aas-paas rahegi. Real predictions ke liye real dataset use karo,
baaki code same rahega.
