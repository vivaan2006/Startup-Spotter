from google.adk.agents import LlmAgent
from google.adk.tools import ToolContext

def update_location_tool(tool_context:ToolContext, new_location:str) -> dict:
    """
    Updates the sessions state of location to new_location.
    """
    print("=== UPDATE_LOCATION CALLED ===")
    print("Previous location:", tool_context.state.get("location"))
    print("New location:", new_location)
    
    tool_context.state['location'] = new_location
    return {
        "status" : "success",
        "state_delta": {"location": new_location}
            }

update_location = LlmAgent(
    name="update_location",
    model="gemini-2.0-flash",
    description="An agent who updates the location session state.",
    instruction=("""Parse through the user prompt and find the budget mentioned by the user. Use update_location_tool to update the state of {location}.
                 Format your response so that there are no blank lines.
                 
                 You have access to the following tool: update_location_tool"""),
    tools=[update_location_tool]
)