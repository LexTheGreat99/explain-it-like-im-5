import OpenAI from 'openai'
import { defineEventHandler, readBody, createError, getHeader, getRequestIP } from 'h3'
import { useRuntimeConfig } from '#imports'

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number, timestamp: number }>()
const MAX_REQUESTS_PER_MINUTE = 10
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute

// API key validation function
const isValidApiKey = (apiKey: string | null): boolean => {
  return Boolean(apiKey && typeof apiKey === 'string' && apiKey.trim().startsWith('sk-') && apiKey.trim().length > 20)
}

export default defineEventHandler(async (event) => {
  try {
    // Rate limiting check
    const clientIp = getRequestIP(event) || 'unknown'
    const now = Date.now()
    
    if (!rateLimits.has(clientIp)) {
      rateLimits.set(clientIp, { count: 1, timestamp: now })
    } else {
      const limit = rateLimits.get(clientIp)!
      
      // Reset counter if window has passed
      if (now - limit.timestamp > RATE_LIMIT_WINDOW_MS) {
        limit.count = 1
        limit.timestamp = now
      } else {
        // Increment counter
        limit.count++
        
        // Check if rate limit exceeded
        if (limit.count > MAX_REQUESTS_PER_MINUTE) {
          throw createError({
            statusCode: 429,
            message: 'Rate limit exceeded. Please try again later.'
          })
        }
      }
      
      rateLimits.set(clientIp, limit)
    }
    
    const config = useRuntimeConfig()
    
    // Get API key from header or fall back to environment variable
    const apiKey = getHeader(event, 'x-openai-api-key') || config.openaiApiKey
    
    // Validate API key
    if (!isValidApiKey(apiKey)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid OpenAI API key. Please provide a valid API key.'
      })
    }

    const openai = new OpenAI({
      apiKey: apiKey as string,
    })

    const body = await readBody(event)
    const { component, question } = body

    if (!component) {
      throw createError({
        statusCode: 400,
        message: 'Component name is required.'
      })
    }

    let prompt = question 
      ? `Follow-up question about ${component}: ${question}\nProvide a detailed but simple explanation about this aspect of the ${component} in easy to understand terms.`
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
    console.error('API error:', error.name || 'Unknown error')
    
    // Don't log the full error which might contain API keys
    // Just log the name/type for debugging
    
    // More specific error message, but never include the API key in logs
    let errorMessage = 'Failed to get explanation'
    let statusCode = 500
    
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message
      statusCode = error.response.status || 500
      
      // Special check for API key errors
      if (
        errorMessage.includes('API key') || 
        errorMessage.includes('authentication') ||
        errorMessage.includes('Invalid')
      ) {
        statusCode = 401
        errorMessage = 'Invalid API key. Please check your OpenAI API key and try again.'
      }
    } else if (error.statusCode) {
      statusCode = error.statusCode
      errorMessage = error.message || errorMessage
    }
    
    throw createError({
      statusCode,
      message: errorMessage
    })
  }
}) 