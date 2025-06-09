from google.adk.agents import LlmAgent

update_budget = LlmAgent(
    name="update_budget",
    model="gemini-2.0-flash",
    description="An agent who updates the budget session state.",
    instruction=("""Parse through the user prompt and return the budget mentioned by the user. Your response should only include the budget.
                 Format your response so that there are no blank lines."""),
    output_key="budget"
)