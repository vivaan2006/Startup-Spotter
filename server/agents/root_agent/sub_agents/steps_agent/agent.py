from google.adk.agents import LlmAgent
from google.adk.tools import google_search
from .prompts import INITIAL_STEPS_AGENT_INSTRUCTIONS

steps_agent = LlmAgent(
    name="steps_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that gives initial steps to users that specify what type of business they want to start."
    ),
    instruction=(
        INITIAL_STEPS_AGENT_INSTRUCTIONS
    ),
    tools=[google_search]
)