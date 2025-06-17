from google.adk.agents import Agent
from .prompts import MONOGO_DB_DATA_FETCHER_INSTRUCTIONS
from .vectorQuery import vector_search

mongoDB_data_fetcher = Agent(
    name="mongoDB_data_fetcher",
    model="gemini-2.0-flash",
    description=(
        "A bot that fetches location data from MongoDB. It retrieves information about demographics in a given location."
    ),
    instruction=(
        MONOGO_DB_DATA_FETCHER_INSTRUCTIONS
    ),
    tools=[vector_search],
)