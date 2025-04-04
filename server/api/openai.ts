export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const apiKey = config.public.OPENAI_API_KEY; 
  
    if (!apiKey) {
      return { error: "API key not provided. Running in mock mode.", data: ["Mocked response"] };
    }
  
    // Actual API call (only runs if API key exists)
  });