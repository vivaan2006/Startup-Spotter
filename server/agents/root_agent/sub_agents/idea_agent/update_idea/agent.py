from google.adk.agents import LlmAgent
from google.adk.tools import ToolContext

def update_idea_tool(tool_context:ToolContext, new_idea:list[str]) -> dict:
    """
    Updates the sessions state of idea to new_idea. 
    new_idea is a list formatted like this: ["idea", "description"]
    """
    print("=== UPDATE_idea CALLED ===")
    print("Previous idea:", tool_context.state.get("idea"))
    print("New idea:", new_idea)
    
    tool_context.state['idea'] = new_idea
    return {
        "status" : "success",
        "state_delta": {"idea": new_idea}
            }

update_idea = LlmAgent(
    name="update_idea",
    model="gemini-2.0-flash",
    description="An agent who updates the idea session state.",
    instruction=("""Parse through the user prompt and find the idea mentioned by the user. Use update_idea_tool to update the state of {idea}.
                 You should pass the idea and the description of the idea into the new_idea parameter as a list formatted like this ["idea", "description"].
                 For example, new_idea = ["Startup Spotter", "Help aspiring entrepeneurs find startups."]. If there is no description, leave as "".
                 Format your response so that there are no blank lines.
                 
                 You have access to the following tool: update_idea_tool"""),
    tools=[update_idea_tool]
)