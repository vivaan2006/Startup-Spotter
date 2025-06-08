from google.adk.agents import LlmAgent
from google.adk.tools import google_search
from ...prompts import STARTUP_IDEA_AGENT_INSTRUCTIONS

idea_agent = LlmAgent(
    name="idea_agent",
    model="gemini-2.0-flash",
    # description=(
    #     "A bot that recommends microbusiness ideas to users that did not specify any specific idea."
    # ),
    description=(
        "A bot that greets the user."
    ),
    instruction=(
        # STARTUP_IDEA_AGENT_INSTRUCTIONS
        "Say hi to the user"
    )
    # tools=[google_search]
)