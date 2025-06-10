# server/scripts/mdb/client.py
from pymongo import MongoClient

client = MongoClient("YOUR_ATLAS_URI")
db = client.startup_spotter
collection = db.demographics
