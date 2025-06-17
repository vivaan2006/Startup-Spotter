from google.adk.agents import LlmAgent
from google.adk.tools import google_search
from .prompts import INITIAL_STEPS_AGENT_INSTRUCTIONS

steps_agent = LlmAgent(
    name="steps_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that gives steps to users that specify what type of business they want to start. It also has access to Google Search to gather information about the steps needed to start a business in a given location."
    ),
    instruction=(
        INITIAL_STEPS_AGENT_INSTRUCTIONS
    ),
    tools=[google_search]
)