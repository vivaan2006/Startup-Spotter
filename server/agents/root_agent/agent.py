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
        ROOT_AGENT_INSTRUCTIONS
    ),
    tools=[AgentTool(idea_agent), AgentTool(steps_agent)],
)