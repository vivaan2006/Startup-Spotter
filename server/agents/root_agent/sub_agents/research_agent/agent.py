from google.adk.agents import Agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset
from mcp.client.stdio import StdioServerParameters
import os
from dotenv import load_dotenv

load_dotenv()



client_id = os.getenv("MDB_MCP_API_CLIENT_ID")
secret_key = os.getenv("MDB_MCP_API_CLIENT_SECRET")
google_maps_api_key = os.getenv("GOOGLE_MAPS_API_KEY", "")

research_agent = Agent(
    name="mcp_test_agent",
    model="gemini-2.0-flash",
    instruction="Return information about businesses in a given location. Use the tools provided to access Google Maps and MongoDB.",
    description=(
        "A bot that provides information about businesses in a given location using Google Maps and MongoDB."
    ),
    tools=[
        MCPToolset(
            connection_params=StdioServerParameters(
                command='npx',
                args=["-y", "@modelcontextprotocol/server-google-maps"],
                env={"GOOGLE_MAPS_API_KEY": google_maps_api_key},

            )
        ),
        MCPToolset(
            connection_params=StdioServerParameters(
                command="npx",
                args=[
                    "-y",
                    "mongodb-mcp-server",
                    "--apiClientId",
                    str(client_id),
                    "--apiClientSecret",
                    str(secret_key)
                    ]
                )
        )
    ]
)

if __name__ == "__main__":
    print("Research Agent is ready to use.")
    print(f"Google Maps API Key: {google_maps_api_key}")
    print(f"Client ID: {client_id}")
    print(f"Secret Key: {secret_key}")