from google.adk.agents import Agent
from .prompts import GOOGLE_SEARCH_RESEARCHER_INSTRUCTIONS
from google.adk.tools import google_search

google_search_researcher = Agent(
    name="google_search_researcher",
    model="gemini-2.0-flash",
    description=(
        "A bot that uses Google Search to gather information about businesses, demographics, and demand patterns in a given location."
    ),
    instruction=(
        GOOGLE_SEARCH_RESEARCHER_INSTRUCTIONS
    ),
    tools=[google_search]
)