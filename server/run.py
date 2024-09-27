from app import create_app
import os
# from flask_session import Session

app = create_app()
# Session(app)

if __name__=="__main__":
    app.run(debug=True, port=6789)