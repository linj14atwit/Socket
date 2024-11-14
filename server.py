import asyncio
import json

from websockets.asyncio.server import broadcast, serve
from app import app

connected = set()



async def login(websocket):
    connected.add(websocket)

    pass

async def logout(websocket):

    pass

async def send(websocket):
    pass


async def handler(websocket):
    async for message in websocket:
        # event = json.loads(message)
        print(message)
        await websocket.send(message)
    pass

def recieve(websocket):
    pass

async def main():
        async with serve(handler, "", 8001):
            await asyncio.get_running_loop().create_future()

if __name__ == "__main__":
     asyncio.run(main())
