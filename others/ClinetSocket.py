import socket

class ClientSocket():
    # client plus
    def __init__(self, host: str, port:int) -> None:
        self.host = host
        self.port = port
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        

    def connect_server(self):
        self.client_socket.connect((self.host, self.port))

        print(f"client connected on {self.host}:{self.port}")
        #establish connection
        
        message = self.client_socket.recv(1024)
        print(f"recieved message \"{message.decode('utf-8')}\"")
        print("enter message to send, END to end")
        while True:
            message = input(">")
            self.client_socket.send(message.encode('utf-8'))
            if message.strip(" \n\t") == "END":
                break
            print(f"recieved message \"{self.client_socket.recv(1024).decode('utf-8')}\"")

if __name__ == "__main__":
    host = "127.0.0.1"
    port = 1200
    server = ClientSocket(host=host, port=port)
    server.connect_server()