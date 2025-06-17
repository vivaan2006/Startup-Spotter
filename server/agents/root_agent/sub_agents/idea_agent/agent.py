from google.adk.agents import LlmAgent
from .prompts import STARTUP_IDEA_AGENT_INSTRUCTIONS

idea_agent = LlmAgent(
    name="idea_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that recommends business ideas to users that did not specify any specific idea."
    ),
    instruction=(
        STARTUP_IDEA_AGENT_INSTRUCTIONS
    )
)