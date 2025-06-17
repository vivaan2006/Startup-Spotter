from google.adk.agents import Agent
from .prompts import RESEARCH_AGENT_INSTRUCTIONS
from google.adk.tools.agent_tool import AgentTool
from .sub_agents.mongoDB_data_fetcher.agent import mongoDB_data_fetcher
from .sub_agents.google_search_researcher.agent import google_search_researcher

from .sub_agents.google_maps_data_fetcher.agent import google_maps_data_fetcher # To be implemented

research_agent = Agent(
    name="research_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that summarizes the demand pattern of a location by researching existing businesses, the demographics, and previous demand patterns in a given location."
    ),
    instruction=RESEARCH_AGENT_INSTRUCTIONS,
    tools=[
        AgentTool(mongoDB_data_fetcher),
        AgentTool(google_search_researcher),
        # AgentTool(google_maps_data_fetcher)
    ],
    
    output_key="data"
)