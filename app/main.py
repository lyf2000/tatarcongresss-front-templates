import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Serve static files (accessed via /static/filename.ext)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Setup Jinja2
templates = Jinja2Templates(directory="app/templates")

# Catch-all route to map URL paths to HTML files
@app.get("/{file_path:path}", response_class=HTMLResponse)
async def render_template(request: Request, file_path: str):
    # Default to index.html for the root URL
    if not file_path:
        file_path = "index.html"
    
    # Auto-append .html if the user omitted it in the URL
    if not file_path.endswith(".html"):
        file_path += ".html"
        
    template_path = os.path.join("app/templates", file_path)
    
    if os.path.exists(template_path):
        return templates.TemplateResponse(file_path, {"request": request})
    
    return HTMLResponse(content="<h1>404 - Template Not Found</h1>", status_code=404)