from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Cord(BaseModel):
    timestamp: str
    latitude: str
    longitude: str
    
# class JsonList(BaseModel):
#     data: List[Cord]

origins = ['https://localhost:3000',
"http://localhost",
"http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return("hello there!")

@app.get("/api/todo")
async def get_todo():
    return 1
collectedData = []
@app.post("/analyse")
async def post_todo(dataRec:Cord):
    collectedData.append(dataRec)
    return dataRec

# print(collectedData)