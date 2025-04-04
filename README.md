# Explain This Like I'm 5 - AI Component Explorer

An interactive web application that explains complex system components in simple, easy-to-understand terms using AI. Built with Vue 3, Nuxt 3, and OpenAI's GPT API.

## 🌟 Features

- Interactive component selection
- AI-powered explanations in simple terms
- Follow-up questions support
- Modern, responsive UI with animations
- Dark mode support
- Loading states and error handling

## 🏗️ Architecture Overview

The application follows a modern, component-based architecture:

### Frontend Layer
- **Vue 3 Components**: Modular, reusable UI components
- **Nuxt 3 Framework**: Server-side rendering and routing
- **State Management**: Vue 3 Composition API with refs and reactive state
- **UI Components**: Custom-built components with Tailwind CSS

### Backend Layer
- **Nuxt Server Routes**: API endpoint handling
- **OpenAI Integration**: GPT API communication
- **Error Handling**: Comprehensive error management
- **Rate Limiting**: Request throttling for API protection

### Data Flow
1. User interaction triggers component state changes
2. State changes invoke API calls through server routes
3. Server processes requests and communicates with OpenAI
4. Responses are streamed back to the UI
5. UI updates reactively with new data

## 🛠️ Vue + Nuxt Structure

```
├── components/
│   ├── ChatBox.vue         # Handles AI responses and follow-ups
│   └── ComponentSelector.vue # Manages component selection UI
├── pages/
│   ├── index.vue          # Landing page with main interface
│   └── components.vue     # Component exploration page
├── server/
│   └── api/
│       └── explain.ts     # OpenAI API integration
├── composables/           # Shared composition functions
├── utils/                 # Helper functions
└── public/               # Static assets
```

### Component Relationships
- `pages/*.vue` → Top-level route components
- `ComponentSelector.vue` → Emits selection events
- `ChatBox.vue` → Receives and displays AI responses
- `explain.ts` → Handles API communication

## 🤖 GPT Integration

### Implementation
```typescript
// server/api/explain.ts
const handleExplanation = async (component: string, question?: string) => {
  const prompt = question 
    ? `Follow-up question about ${component}: ${question}`
    : `Explain ${component} in simple terms`;
    
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt,
    temperature: 0.7,
    max_tokens: 500
  });
  
  return response.choices[0].text;
};
```

### Features
- Dynamic prompt generation
- Context-aware follow-up handling
- Error recovery
- Response streaming
- Rate limiting implementation

## 📦 Deployment Steps

1. **Environment Setup**
   ```bash
   # Create production environment file
   cp .env.example .env.production
   # Set production variables
   nano .env.production
   ```

2. **Application Build**
   ```bash
   # Install dependencies
   npm install
   # Build for production
   npm run build
   ```

3. Deployment to Vercel (since Buildship was not used)
Deploy to Vercel:

Go to Vercel and connect your GitHub repository.

Vercel will automatically deploy your app and provide you with a live URL.

Alternatively, you can trigger a deployment manually via the Vercel dashboard.

4. **Post-Deployment**
   - Configure custom domain (if applicable)
   - Set up SSL certificates
   - Configure environment variables
   - Verify API connections

5. **Monitoring**
   - Check server logs
   - Monitor API usage
   - Track error rates
   - Review performance metrics

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 + Nuxt 3
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT API
- **Deployment**: Buildship.com

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
├── components/
│   ├── ChatBox.vue         # Chat interface component
│   └── ComponentSelector.vue # Component selection buttons
├── pages/
│   └── index.vue           # Main application page
├── server/
│   └── api/
│       └── explain.ts      # OpenAI API integration
└── public/                 # Static assets
```

## 💡 How It Works

1. **Component Selection**: Users select a speaker component (Woofer, Tweeter, etc.)
2. **AI Processing**: The selection is sent to OpenAI GPT with a prompt to explain the component in simple terms
3. **Response Display**: The AI's response is displayed in a chat-like interface
4. **Follow-up Questions**: Users can ask follow-up questions about the selected component

## 🎨 UI/UX Features

- Gradient buttons with hover effects
- Loading spinners
- Smooth transitions
- Responsive design
- Dark mode support
- Error handling with user-friendly messages

## 🔧 API Integration

The application uses OpenAI's GPT API to generate explanations. The server endpoint (`/api/explain`) handles:
- Initial component explanations
- Follow-up questions
- Error handling
- Rate limiting

## 📝 Deployment

1. Build the application:
   ```bash
   npm run build
   ```
2. Follow the Vercel Deployment guide.

Connect your GitHub repo to Vercel and trigger the deployment.

