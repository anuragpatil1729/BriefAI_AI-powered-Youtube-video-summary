from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from summarizer import summarize

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoRequest(BaseModel):
    url: str

@app.post("/summary")
async def summarize_endpoint(request: VideoRequest):
    try:
        summary = summarize(request.url)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))