# YouTube Summarizer

A full-stack application that generates AI-powered summaries of YouTube videos with a cyberpunk-themed interface.

## 🚀 Features

- Extract transcripts from YouTube videos
- Generate concise summaries using Google's Gemini AI
- Cyberpunk-themed neon UI with typing animation effects
- Copy summary to clipboard
- Real-time loading indicators

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **LangChain** - AI orchestration framework
- **Google Gemini 2.5 Flash** - Large language model for summarization
- **YouTube Transcript API** - Extract video transcripts

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Rolldown** - Fast bundler

## 📋 Prerequisites

- Python 3.13+
- Node.js 20.19.0+ or 22.12.0+
- Google API Key (for Gemini)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd podcast_summarizer
```

### 2. Backend Setup

```bash
cd backend/venv

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn youtube-transcript-api langchain-google-genai python-dotenv

# Create .env file
echo "GOOGLE_API_KEY=your_api_key_here" > .env
```

### 3. Frontend Setup

```bash
cd ../../frontend

# Install dependencies
npm install
```

## 🚦 Running the Application

### Start Backend Server

```bash
cd backend/venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn api:app --reload
```

The backend will run on `http://127.0.0.1:8000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
podcast_summarizer/
├── backend/
│   └── venv/
│       ├── api.py           # FastAPI endpoints
│       ├── summarizer.py    # Core summarization logic
│       └── .env            # Environment variables (create this)
├── frontend/
│   ├── src/
│   │   ├── main.jsx        # Main React component
│   │   ├── index.css       # Global styles
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🔑 Environment Variables

Create a `.env` file in `backend/venv/`:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

Get your API key from: https://makersuite.google.com/app/apikey

## 🎯 Usage

1. Start both backend and frontend servers
2. Open your browser to `http://localhost:5173`
3. Paste a YouTube URL in the input field
4. Click "EXECUTE" to generate summary
5. Watch the typing animation as the summary appears
6. Click "COPY" to copy the summary to clipboard

## 📝 API Endpoints

### POST /summary

Generate a summary for a YouTube video.

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "summary": "AI-generated summary text..."
}
```

## 🎨 UI Features

- **Neon Cyberpunk Theme** - Eye-catching gradient effects
- **Glass Morphism** - Translucent card design with backdrop blur
- **Typing Animation** - Terminal-style character-by-character reveal
- **Pulsing Cursor** - Animated cursor during typing effect
- **Loading Spinner** - Neon rotating loader
- **Responsive Design** - Works on all screen sizes

## 🔒 CORS Configuration

The backend is configured to accept requests from `http://localhost:5173`. Modify the CORS settings in `api.py` if you need to allow other origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐛 Troubleshooting

### Backend Issues

- **ImportError**: Ensure all Python dependencies are installed in the virtual environment
- **API Key Error**: Verify your `GOOGLE_API_KEY` is set correctly in `.env`
- **Port 8000 in use**: Change the port in the uvicorn command: `uvicorn api:app --port 8001`

### Frontend Issues

- **Module not found**: Run `npm install` in the frontend directory
- **Port 5173 in use**: Vite will automatically use the next available port
- **CORS errors**: Ensure backend is running and CORS is configured correctly

## 📦 Dependencies

### Backend
- fastapi
- uvicorn[standard]
- youtube-transcript-api
- langchain-google-genai
- python-dotenv

### Frontend
- react ^19.2.0
- react-dom ^19.2.0
- tailwindcss ^3.4.17
- vite (rolldown-vite) 7.2.5

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- YouTube Transcript API for video transcription
- React and Vite communities
- Tailwind CSS for styling utilities

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.
