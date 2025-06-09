from google.adk.agents import LlmAgent

update_location = LlmAgent(
    name="update_location",
    model="gemini-2.0-flash",
    description="An agent who updates the location session state.",
    instruction=("""Parse through the user prompt and return the location mentioned by the user. Your response should only include the location.
                 Format your response so that there are no blank lines."""),
    output_key="location"
)