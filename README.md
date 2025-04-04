# Explain This Like I'm 5 - AI Component Explorer

An interactive web application that explains complex system components in simple, easy-to-understand terms using AI. Built with Vue 3, Nuxt 3, and OpenAI's GPT API.

## 🌟 Features

- Interactive component selection
- AI-powered explanations in simple terms
- Follow-up questions support
- Modern, responsive UI with animations
- Dark mode support
- Loading states and error handling

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
2. Deploy to Buildship.com following their deployment guidelines

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Nuxt.js team for the amazing framework
- The Vue.js community for their excellent documentation and support
