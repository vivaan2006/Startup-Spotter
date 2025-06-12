from google.adk.agents import Agent, SequentialAgent
from google.adk.tools.agent_tool import AgentTool
from .prompts import ROOT_AGENT_INSTRUCTIONS
from .sub_agents.idea_agent.agent import idea_agent
from .sub_agents.steps_agent.agent import steps_agent
from .utils.update_budget import update_budget
from .utils.update_location import update_location
from .utils.update_interests import update_interests
from .utils.update_steps import update_steps
from .sub_agents.research_agent.agent import research_agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset
from mcp.client.stdio import StdioServerParameters

update_states = SequentialAgent(
    name="update_states",
    sub_agents=[update_budget, update_location, update_interests, research_agent],
    description="Pipeline to update session states."
)

# research_and_idea_agent = SequentialAgent(
#     name="research_and_idea_agent",
#     sub_agents=[research_agent, idea_agent],
#     description="Pipeline to research existing businesses and generate startup ideas."
# )


root_agent = Agent(
    name="root_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that gives startup recommendations based on demand patterns and budget."
    ),
    instruction=(
        #ROOT_AGENT_INSTRUCTIONS
        "Call update_states to update the session states based on user input. Then call research_and_idea agent and return its output. You are friendly."
    ),
    tools=[AgentTool(steps_agent), AgentTool(update_states), AgentTool(update_steps), AgentTool(research_agent), AgentTool(idea_agent) ],
    
)


