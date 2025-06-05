from google.adk.agents import LlmAgent
from google.adk.tools import google_search
from prompts import STARTUP_AGENT_INSTRUCTIONS

startupSearchAgent = LlmAgent(
    model="gemini-2.0-flash",
    name="startup_agent",
    description="A bot that gives startup recommendations based on demand patterns and budget.",
    instruction=STARTUP_AGENT_INSTRUCTIONS,
    tools=[google_search],
)