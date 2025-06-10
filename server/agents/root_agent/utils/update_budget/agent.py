from google.adk.agents import LlmAgent
from google.adk.tools import ToolContext

def update_budget_tool(tool_context: ToolContext, new_budget: str) -> dict:
    """
    Updates the session state of budget to new_budget.
    """
    print("=== UPDATE_BUDGET CALLED ===")
    print("Previous budget:", tool_context.state.get("budget"))
    print("New budget:", new_budget)
    
    tool_context.state['budget'] = new_budget
    return {
        "status" : "success",
        "state_delta": {"budget": new_budget}
            }

update_budget = LlmAgent(
    name="update_budget",
    model="gemini-2.0-flash",
    description="An agent who updates the budget session state.",
    instruction=("""Parse through the user prompt and find the budget mentioned by the user. Use update_budget_tool to update the state of {budget}.
                 If a budget is not mentioned, do nothing.
                 You should pass in the budget mentioned by the user as the new_budget parameter in update_budget_tool.
                 Format your response so that there are no blank lines.
                 
                 You have access to the following tool: update_budget_tool"""),
    tools=[update_budget_tool]
)