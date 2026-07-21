import http.server
import socketserver
import os

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Default behavior gets the absolute path
        base_path = super().translate_path(path)
        
        # If it doesn't exist and doesn't have an extension, try adding .html
        if not os.path.exists(base_path) and not '.' in os.path.basename(base_path):
            return base_path + '.html'
            
        return base_path

# Allow reuse of address to prevent "address already in use" errors if restarted quickly
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at port {PORT} with .html auto-append")
    httpd.serve_forever()
