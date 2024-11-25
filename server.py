import asyncio
import json
import os
import signal
import time

from websockets.asyncio.server import broadcast, serve

connected = set()
connection = dict()



async def login(websocket):
    connected.add(websocket)

    pass

def verify_name(websocket, event):
    for name in connection.values():
        if name == event["user_name"]:
            message = {
                "user_name": "SYSTEM", "action": "DENY", 
                "message_id": int(time.time()*1000), 
                "text": "username taken"
                }
            
            # websocket.send(message)
            return False
        connection[websocket] = event["user_name"]
        return True

async def handler(websocket):
    verified = True
    connected.add(websocket)
    # print(connected)
    async for message in websocket:
        # event = json.loads(message)
        event = eval(message)
        try:
            if event["action"] == "JOIN":
                if not verify_name(websocket, event):
                    verified = False 
        except KeyError:
             pass
        
        # print(event, type(event))
        if verified:
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
