from google.adk.agents import Agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset
from mcp.client.stdio import StdioServerParameters
import os
from dotenv import load_dotenv
from .prompts import RESEARCH_AGENT_INSTRUCTIONS
from google.adk.tools.agent_tool import AgentTool
from .sub_agents.google_maps_data_fetcher.agent import google_maps_data_fetcher

load_dotenv()



client_id = os.getenv("MDB_MCP_API_CLIENT_ID")
secret_key = os.getenv("MDB_MCP_API_CLIENT_SECRET")
google_maps_api_key = os.getenv("GOOGLE_MAPS_API_KEY", "")

research_agent = Agent(
    name="research_agent",
    model="gemini-2.0-flash",
    description=(
        "A bot that determines the demand pattern of a location by researching existing businesses, the demographics, and previous demand patterns in a given location."
    ),
    instruction=RESEARCH_AGENT_INSTRUCTIONS,
    tools=[
        AgentTool(google_maps_data_fetcher),
        # MCPToolset(
        #     connection_params=StdioServerParameters(
        #         command="npx",
        #         args=[
        #             "-y",
        #             "mongodb-mcp-server",
        #             "--apiClientId",
        #             str(client_id),
        #             "--apiClientSecret",
        #             str(secret_key)
        #             ]
        #         )
        # )
    ],
    
    output_key="data"
)

if __name__ == "__main__":
    print("Research Agent is ready to use.")
    print(f"Google Maps API Key: {google_maps_api_key}")
    print(f"Client ID: {client_id}")
    print(f"Secret Key: {secret_key}")