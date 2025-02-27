import axios from "axios";

const API_URL = import.meta.env.API_URL;
const API_KEY = import.meta.env.API_KEY; // Replace with your API key

export const getChatResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.generated_text || "I'm not sure how to respond.";
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "Sorry, I couldn't process that request.";
  }
};
