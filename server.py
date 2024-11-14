import asyncio
from websockets.asyncio.server import broadcast, serve

from app import app

connected = set()



async def login(websocket):
    connected.add(websocket)

    pass

async def send(websocket):
    pass


async def handler(websocket):
    message = await websocket.recv()
    
    pass

def recieve(websocket):
    pass
