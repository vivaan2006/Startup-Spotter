from google.adk.agents import LlmAgent
from .prompts import STARTUP_IDEA_AGENT_INSTRUCTIONS
from .update_idea import update_idea
from google.adk.tools.agent_tool import AgentTool

idea_agent = LlmAgent(
    name="idea_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that recommends microbusiness ideas to users that did not specify any specific idea."
    ),
    instruction=(
        STARTUP_IDEA_AGENT_INSTRUCTIONS
    ),
    tools=[AgentTool(update_idea)]
)