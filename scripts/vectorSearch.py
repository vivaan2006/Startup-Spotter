import pandas as pd
import json
import numpy as np

# Load CSV
df = pd.read_csv("data/acs2017_county_data.csv")

# Pick useful columns
columns = {
    "County": "county",
    "State": "state",
    "TotalPop": "population",
    "Income": "median_income",
    "Unemployment": "unemployment_rate",
    "Professional": "pct_professional",
    "Service": "pct_service",
    "Office": "pct_office",
    "Construction": "pct_construction",
    "Production": "pct_production",
    "MeanCommute": "mean_commute",
    "Poverty": "poverty_rate",
    "ChildPoverty": "child_poverty_rate"
}

df = df[list(columns.keys())].rename(columns=columns)

# Drop incomplete entries
df = df.dropna(subset=["county", "state", "population", "median_income"])

# Replace NaN, inf, -inf with None
df = df.replace([np.nan, np.inf, -np.inf], None)

# Convert to list of dictionaries
records = df.to_dict(orient="records")

# Save to JSON
with open("data/demographics.json", "w") as f:
    json.dump(records, f, indent=2, allow_nan=False)

print(f"✅ Clean export complete: {len(records)} records")
