// File: test_agent_client.ts

import axios from 'axios';

// Change these ports as needed
const EXPRESS_SERVER_URL = 'http://localhost:3000';

async function startSession(user_id: string): Promise<string> {
  try {
    const response = await axios.post(`${EXPRESS_SERVER_URL}/api/start_session`, { user_id });
    console.log("✅ Session started:", response.data.session_id);
    return response.data.session_id;
  } catch (err: any) {
    console.error("❌ Failed to start session:", err.response?.data || err.message);
    throw err;
  }
}

async function runAgent(session_id: string, user_input: string): Promise<void> {
  try {
    const response = await axios.post(`${EXPRESS_SERVER_URL}/api/run_agent`, {
      session_id,
      user_input
    });
    console.log("✅ Agent response:\n", response.data.response);
  } catch (err: any) {
    console.error("❌ Failed to run agent:", err.response?.data || err.message);
  }
}

async function main() {
  const user_id = "Kyle_Law";

  const session_id = await startSession(user_id);

  await runAgent(session_id, "Give me startup ideas in Queens NYC with a $50,000 budget.");
}

main();
