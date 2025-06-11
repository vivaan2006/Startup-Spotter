from google.adk.agents import Agent, SequentialAgent
from google.adk.tools.agent_tool import AgentTool
from .prompts import ROOT_AGENT_INSTRUCTIONS
from .sub_agents.idea_agent.agent import idea_agent
from .sub_agents.steps_agent.agent import steps_agent
from .utils.update_budget import update_budget
from .utils.update_location import update_location
from .utils.update_interests import update_interests
from .utils.update_idea import update_idea
from .utils.update_steps import update_steps
from .sub_agents.research_agent.agent import research_agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset
from mcp.client.stdio import StdioServerParameters

update_states = SequentialAgent(
    name="update_states",
    sub_agents=[update_budget, update_location, update_interests],
    description="Pipeline to update session states."
)
google_maps_api_key = "AIzaSyDtq4IVKoiR_in1_6wBEyYSK83abErUMRg"
root_agent = Agent(
    name="root_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that gives startup recommendations based on demand patterns and budget."
    ),
    instruction=(
        # ROOT_AGENT_INSTRUCTIONS
        "Be able to answer questions about and use the provided tools."
    ),
    # tools=[AgentTool(idea_agent), AgentTool(steps_agent), AgentTool(update_states), AgentTool(update_idea), AgentTool(update_steps)],
    tools=[AgentTool(research_agent)]
    
)


