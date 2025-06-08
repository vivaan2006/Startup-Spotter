from google.adk.agents import Agent
from google.adk.tools import google_search
from google.adk.tools.agent_tool import AgentTool
from .prompts import ROOT_AGENT_INSTRUCTIONS
from .sub_agents.idea_agent.agent import idea_agent
from .sub_agents.steps_agent.agent import steps_agent

root_agent = Agent(
    name="root_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that gives startup recommendations based on demand patterns and budget."
    ),
    instruction=(
        # ROOT_AGENT_INSTRUCTIONS
        # "Delegate to idea_agent if user is greeting you. Delegate to steps_agent if user is leaving. "
        "You are a bot that gives information on the user. You can access session states such such as {user_id} and {startup_idea}. If startup_idea has None as a value, say 'No startup idea'."
    ),
    # sub_agents=[idea_agent, steps_agent]
)