from google.adk.agents import LlmAgent
from google.adk.tools import ToolContext

def update_interests_tool(tool_context: ToolContext, new_interests: list[str]) -> dict:
    """
    Updates the session state of interests to new_interests.
    """
    print("=== UPDATE_interests CALLED ===")
    print("Previous interests:", tool_context.state.get("interests"))
    print("New interests:", new_interests)

    new_interest_state = tool_context.state.get("interests", []) # Copy old interests
    for interest in new_interests:
        new_interest_state.append(interest)

    tool_context.state["interests"] = new_interest_state
    return {
        "status" : "success",
        "state_delta": {"interests": new_interest_state}
            }


update_interests = LlmAgent(
    name="update_interests",
    model="gemini-2.0-flash",
    description="An agent who updates the interests session state.",
    instruction=("""Parse through the user prompt and find the interests mentioned by the user. Use update_interests_tool to update the state of {interests}.
                 If interests are not mentioned, do nothing.
                 You should pass in the interests mentioned by the user as a list of strings in the new_interests parameter in update_interests_tool.
                 Format your response so that there are no blank lines.
                 
                 You have access to the following tool: update_interests_tool"""),
    tools=[update_interests_tool]
)