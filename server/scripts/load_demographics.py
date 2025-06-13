# server/scripts/load_demographics.py
from dotenv import load_dotenv
load_dotenv()

import os
import sys
import json
from tqdm import tqdm
import time

# Ensure proper module imports from sibling directories
sys.path.append(os.path.abspath(os.path.join(__file__, "../..")))

from geminiembedding.embedding import GeminiEmbedder
from mdbmodel.mdb import collection

# Load your pre-cleaned JSON data
with open("data/demographics.json") as f:
    counties = json.load(f)

# Initialize Gemini embedder
embedder = GeminiEmbedder()

print(f"🧠 Starting embedding process for {len(counties)} counties...")

for county in tqdm(counties, desc="Embedding Counties"):
    if "embedding" in county:
        continue  # Skip already embedded

    # Create a natural-language text from structured data
    text = (
        f"{county['county']} County in {county['state']} has a population of {county['population']}. "
        f"The median income is ${county['median_income']}, the unemployment rate is {county.get('unemployment_rate', 'N/A')}%, "
        f"and the poverty rate is {county.get('poverty_rate', 'N/A')}%. "
        f"Professions include {county.get('pct_professional', 'N/A')}% professional, "
        f"{county.get('pct_service', 'N/A')}% service, and {county.get('pct_construction', 'N/A')}% construction workers."
    )

    try:
        # Embed the county description
        vector = embedder.embed(text)

        # Attach embedding to record
        county["embedding"] = vector

        # Upsert into MongoDB
        collection.update_one(
            {"county": county["county"], "state": county["state"]},
            {"$set": county},
            upsert=True
        )

    except Exception as e:
        print(f"❌ Failed to embed {county['county']}, {county['state']}: {e}")
        time.sleep(1)  # wait briefly to avoid rate limiting

print("✅ All counties processed and stored with embeddings.")