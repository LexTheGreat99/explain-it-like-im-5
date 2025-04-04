import OpenAI from 'openai'
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      message: 'OpenAI API key is not configured'
    })
  }

  const openai = new OpenAI({
    apiKey: config.openaiApiKey,
  })

  try {
    const body = await readBody(event)
    const { component, question } = body

    let prompt = question 
      ? `Follow-up question about ${component}: ${question}`
      : `Explain how a ${component} works in a speaker system in simple terms that a beginner would understand. Focus on the basic function and avoid technical jargon.`

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful expert explaining speaker systems in simple terms. Use analogies and simple language that anyone can understand. Keep responses concise but informative."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500,
    })

    return {
      response: completion.choices[0].message.content
    }
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    
    // More specific error message
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to get explanation'
    
    throw createError({
      statusCode: error.response?.status || 500,
      message: errorMessage
    })
  }
}) 