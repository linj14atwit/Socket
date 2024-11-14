import socket, sys, time

class ServerSocket():
    # server plus
    def __init__(self, host: str, port:int) -> None:
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        pass

    def start_server(self):
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen()

        print(f"server connected on {self.host} {self.port}")

        # esetablish connection
        client_socket, address = self.server_socket.accept()
        print(f"got a connection from {address}")

        message = "connected to socket"
        client_socket.send(message.encode('utf-8'))

        while True:
            received_message = client_socket.recv(1024)
            print(f"received \"{received_message.decode('utf-8')}\"")

            if received_message.decode("utf-8") =="END":
                client_socket.send("recieved message to end, end connection".encode("utf-8"))
                print("recieved message to end, end connection")
                client_socket.close()
                self.server_socket.close()
                break
            
            message = input("> ").encode("utf-8")
            client_socket.send(message)

        
        sys.exit()
        pass
        

if __name__ == "__main__":
    host = "127.0.0.1"
    port = 1200
    server = ServerSocket(host=host, port=port)
    server.start_server()