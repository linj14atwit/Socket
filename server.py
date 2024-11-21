import asyncio
import json
import os
import signal

from websockets.asyncio.server import broadcast, serve

connected = set()



async def login(websocket):
    connected.add(websocket)

    pass

# async def logout(websocket):

#     pass

# async def send(websocket):
#     pass


async def handler(websocket):
    connected.add(websocket)
    print(connected)
    async for message in websocket:
        # event = json.loads(message)
        event = eval(message)
        print(event, type(event))
        for user in connected:
            await user.send(message)
    pass

# def recieve(websocket):
#     pass

async def main():
        loop = asyncio.get_running_loop()
        stop = loop.create_future()
        loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

        port = int(os.environ.get("PORT", "8001"))
        async with serve(handler, "",port):
            await stop

if __name__ == "__main__":
     asyncio.run(main())
