from google.adk.agents import Agent, SequentialAgent
from google.adk.tools.agent_tool import AgentTool
from .prompts import ROOT_AGENT_INSTRUCTIONS
from .sub_agents.idea_agent.agent import idea_agent
from .sub_agents.steps_agent.agent import steps_agent
from .utils.update_budget import update_budget
from .utils.update_location import update_location
from .utils.update_interests import update_interests
from .utils.update_steps import update_steps
from .utils.update_idea import update_idea
from .sub_agents.research_agent.agent import research_agent

update_states = SequentialAgent(
    name="update_states",
    sub_agents=[update_budget, update_location, update_interests],
    description="Pipeline to update the budget, location, and interests sessions states."
)


root_agent = Agent(
    name="root_agent",
    model="gemini-2.0-flash",
    description=(
        "Root agent that manages the session and coordinates other agents. It updates session states based on user input and can call the research agent to gather information about a location, an idea agent to generate business ideas, and a steps agent to generate business steps."
    ),
    instruction=(
        ROOT_AGENT_INSTRUCTIONS

    ),
    tools=[AgentTool(research_agent), AgentTool(idea_agent), AgentTool(steps_agent), AgentTool(update_states), AgentTool(update_steps),  AgentTool(update_idea)],
    
)


