import asyncio
from websockets.sync.client import connect
import ssl
import pathlib

# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
# localhost_pem = pathlib.Path(__file__).with_name("localhost.pem")
# ssl_context.load_cert_chain(localhost_pem)

async def hello():
    uri = "ws://localhost:8765"

    async with connect(uri) as websocket:
        name = "client"

        await websocket.send(name)
        print(f">>> {name}")

        greeting = await websocket.recv()
        print(f"<<< {greeting}")
    # with connect("ws://localhost:8765", ssl_context=True) as websocket:
    #     websocket.send("Hello world!")
    #     message = websocket.recv()
    #     print(f"Received: {message}")
    #     websocket.close()

if __name__ == "__main__":
    asyncio.run(hello())