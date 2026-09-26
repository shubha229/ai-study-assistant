import { validateStudyResult } from "./validateResult";

const API_URL = "http://localhost:5000";

export async function generateStudySet(input) {
  const controller = new AbortController();

  // Timeout after 30 seconds
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 30000);

  let response;

  try {
    response = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input.trim(),
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "The request took too long. Please try again.",
        {
          cause: error,
        }
      );
    }

    throw new Error(
      "Unable to connect to the server. Please try again.",
      {
        cause: error,
      }
    );
  } finally {
    clearTimeout(timeoutId);
  }

  // -----------------------------------
  // Parse server response
  // -----------------------------------

  let result;

  try {
    result = await response.json();
  } catch (error) {
    console.error(
      "Response parsing error:",
      error
    );

    throw new Error(
      "Server returned an invalid response.",
      {
        cause: error,
      }
    );
  }

  // -----------------------------------
  // Check API response
  // -----------------------------------

  if (!response.ok || !result.success) {
    throw new Error(
      result.error ||
        "Failed to generate study material."
    );
  }

  // -----------------------------------
  // Check data exists
  // -----------------------------------

  if (!result.data) {
    throw new Error(
      "Server returned empty study data."
    );
  }

  // -----------------------------------
  // Validate study data
  // -----------------------------------

  const validation = validateStudyResult(
    result.data
  );

  if (!validation.valid) {
    throw new Error(
      validation.error ||
        "The AI returned invalid study material."
    );
  }

  // -----------------------------------
  // Return validated data
  // -----------------------------------

  return validation.data;
}