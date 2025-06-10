from google.adk.agents import Agent, SequentialAgent
from google.adk.tools.agent_tool import AgentTool
from .prompts import ROOT_AGENT_INSTRUCTIONS
from .sub_agents.idea_agent.agent import idea_agent
from .sub_agents.steps_agent.agent import steps_agent
from google.adk.tools import ToolContext
from .utils.update_budget import update_budget
from .utils.update_location import update_location

# def update_budget(tool_context: ToolContext, new_budget: str) -> dict:
#     """
#     Updates the session state of budget to new_budget.
#     """
#     print("=== UPDATE_BUDGET CALLED ===")
#     print("Previous budget:", tool_context.state.get("budget"))
#     print("New budget:", new_budget)
#     tool_context.state['budget'] = new_budget
#     return {
#         "status" : "success",
#         "state_delta": {"budget": new_budget}
#             }

# def update_location(tool_context: ToolContext, new_location: str) -> dict:
#     """
#     Updates the sessions state of location to new_location.
#     """
#     print("=== UPDATE_LOCATION CALLED ===")
#     print("Previous location:", tool_context.state.get("location"))
#     print("New location:", new_location)
    
#     tool_context.state['location'] = new_location
#     return {
#         "status" : "success",
#         "state_delta": {"location": new_location}
#             }

update_states = SequentialAgent(
    name="update_states",
    sub_agents=[update_budget, update_location],
    description="Pipeline to update session states."
)

root_agent = Agent(
    name="root_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that gives startup recommendations based on demand patterns and budget."
    ),
    instruction=(
        ROOT_AGENT_INSTRUCTIONS
    ),
    tools=[AgentTool(idea_agent), AgentTool(steps_agent), AgentTool(update_states)],
)

# - If a user supplies their interests, use update_interests to update the session state: {interests}
#    - If a user supplies a business idea, use update_idea to update the session state: {idea}