from google.adk.agents import Agent
from .prompts import STARTUP_AGENT_INSTRUCTIONS
from google.adk.tools import google_search

root_agent = Agent(
    name="startup_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that gives startup recommendations based on demand patterns and budget."
    ),
    instruction=(
        STARTUP_AGENT_INSTRUCTIONS
    ),
    tools=[google_search],
)