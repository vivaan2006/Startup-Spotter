from google.adk.agents import LlmAgent
from google.adk.tools import ToolContext

def update_steps_tool(tool_context:ToolContext, new_steps:list[list[str]]) -> dict:
    """
    Updates the sessions state of steps to new_steps. 
    new_steps is a 2D list with 3 elements formatted like this: [["Step Number", "Step Name", "Step Description"]]
    """
    print("=== UPDATE_STEPS CALLED ===")
    print("Previous steps:", tool_context.state.get("steps"))
    print("New steps:", new_steps)
    
    tool_context.state['steps'] = new_steps
    return {
        "status" : "success",
        "state_delta": {"steps": new_steps}
            }

update_steps = LlmAgent(
    name="update_steps",
    model="gemini-2.0-flash",
    description="An agent who updates the steps session state.",
    instruction=("""Parse through the user prompt and find the steps mentioned by the user. Use update_steps_tool to update the state of {steps}.
                 The new_steps parameter is a 2D list with 3 elements formatted like this: [["Step Number", "Step Name", "Step Description"]]
                 Step number is the number of the step as a String, step name is the name of the step, and step description is a description of the step.
                 Format your response so that there are no blank lines. For example:
                 new_steps = [["1","Buy a license", "You need to buy a licence from the government to start a business"], 
                              ["2", "Find a property", "You need a building to run your business out of."]]
                 
                 You have access to the following tool: update_steps_tool"""),
    tools=[update_steps_tool]
)