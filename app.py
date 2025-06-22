import os
import logging
from flask import Flask, render_template

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

@app.route('/')
def index():
    """Main route for the link in bio page"""
    # Profile data - in a real app this would come from a database
    profile_data = {
        'name': 'Batuhan Köse',
        'bio': 'Ai dev and ChatBot dev',
        'profile_image': '/static/profile.png',
        'social_links': [
            {
                'name': 'Instagram',
                'url': 'https://instagram.com/batuhankose62',
                'icon': 'fab fa-instagram',
                'color': 'instagram'
            },
            {
                'name': 'LinkedIn',
                'url': 'https://www.linkedin.com/in/batuhan-köse-49675534a',
                'icon': 'fab fa-linkedin',
                'color': 'linkedin'
            },
            {
                'name': 'GitHub',
                'url': 'https://github.com/batuhankose2008',
                'icon': 'fab fa-github',
                'color': 'github'
            }
        ]
    }
    
    return render_template('index.html', profile=profile_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
