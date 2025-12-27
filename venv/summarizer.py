from youtube_transcript_api import YouTubeTranscriptApi
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

def get_transcript(url):
    video_id = url.split("v=")[-1].split("&")[0]

    ytt = YouTubeTranscriptApi()
    transcript = ytt.fetch(video_id)

    return " ".join(item.text for item in transcript)

def summarize(url: str) -> str:
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        temperature=0.3
    )

    transcript = get_transcript(url)

    prompt = ChatPromptTemplate.from_template(
        "Summarize the following text clearly and concisely:\n\n{text}"
    )

    chain = prompt | llm
    result = chain.invoke({"text": transcript})

    return result.content

if __name__ == "__main__":
    url = "https://www.youtube.com/watch?v=0e3GPea1Tyg"
    print(summarize(url))