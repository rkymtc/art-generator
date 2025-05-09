import os
import time
import uuid
import json
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image, ImageDraw, ImageFont
import random
import threading
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)

cred = credentials.Certificate('art-generator-e9e91-firebase-adminsdk-fbsvc-76ebee637f.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

PROCESSING = 'processing'
DONE = 'done'
ERROR = 'error'

def add_logo_to_firestore(task_id: str, data: dict) -> None:
    """Add a logo task to Firestore"""
    try:
        doc_ref = db.collection('logos').document(task_id)
        doc_ref.set({
            **data,
            'updatedAt': datetime.now().isoformat()
        })
        print(f"Logo task {task_id} added to Firestore")
    except Exception as e:
        print(f"Error adding logo to Firestore: {str(e)}")
        raise e

def update_logo_in_firestore(task_id: str, updates: dict) -> None:
    """Update a logo task in Firestore"""
    try:
        doc_ref = db.collection('logos').document(task_id)
        doc_ref.update({
            **updates,
            'updatedAt': datetime.now().isoformat()
        })
        print(f"Logo task {task_id} updated in Firestore")
    except Exception as e:
        print(f"Error updating logo in Firestore: {str(e)}")
        raise e

def get_logo_from_firestore(task_id: str) -> dict:
    """Get a logo task from Firestore"""
    try:
        doc_ref = db.collection('logos').document(task_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        return None
    except Exception as e:
        print(f"Error getting logo from Firestore: {str(e)}")
        raise e

def get_logos_from_firestore(limit: int = 10) -> list:
    """Get all logo tasks from Firestore"""
    try:
        logos_ref = db.collection('logos')
        query = logos_ref.order_by('createdAt', direction=firestore.Query.DESCENDING).limit(limit)
        docs = query.stream()
        return [doc.to_dict() for doc in docs]
    except Exception as e:
        print(f"Error getting logos from Firestore: {str(e)}")
        raise e

def generate_logo_image(prompt, style):
    """Generate a simple placeholder logo image based on the prompt and style"""
    width, height = 400, 400
    
    bg_colors = {
        'monogram': (245, 245, 245),
        'abstract': (108, 92, 231),
        'mascot': (46, 204, 113),
        'default': (51, 51, 51)
    }
    
    text_colors = {
        'monogram': (0, 0, 0),
        'abstract': (255, 255, 255),
        'mascot': (255, 255, 255),
        'default': (255, 255, 255)
    }
    
    bg_color = bg_colors.get(style, bg_colors['default'])
    text_color = text_colors.get(style, text_colors['default'])
    
    img = Image.new('RGB', (width, height), color=bg_color)
    d = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("Arial", 40)
    except IOError:
        font = ImageFont.load_default()
    
    text = prompt[:10] + "..." if len(prompt) > 10 else prompt
    bbox = font.getbbox(text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((width-tw)/2, (height-th)/2), text, fill=text_color, font=font)
    
    filename = f"logo_{uuid.uuid4()}.png"
    filepath = os.path.join("static", filename)
    
    os.makedirs("static", exist_ok=True)
    
    img.save(filepath)
    return filepath

def logo_generation_task(task_id, prompt, style, host_url):
    """Asynchronous task to simulate logo generation"""
    try:
        processing_time = random.randint(5, 10)
        time.sleep(processing_time)
        
        if random.random() < 0.1:
            error_data = {
                'status': ERROR,
                'error': 'Failed to generate logo. The service is temporarily unavailable.',
                'updatedAt': datetime.now().isoformat()
            }
            update_logo_in_firestore(task_id, error_data)
            return
        
        image_path = generate_logo_image(prompt, style)
        
        # Use the host URL passed from the request context
        image_url = f"{host_url}/{image_path}"
        
        completion_data = {
            'status': DONE,
            'imageUrl': image_url,
            'completedAt': datetime.now().isoformat(),
            'updatedAt': datetime.now().isoformat()
        }
        update_logo_in_firestore(task_id, completion_data)
        
    except Exception as e:
        print(f"Error in logo generation: {str(e)}")
        try:
            error_data = {
                'status': ERROR,
                'error': str(e),
                'updatedAt': datetime.now().isoformat()
            }
            update_logo_in_firestore(task_id, error_data)
        except:
            pass

@app.route('/api/logo/generate', methods=['POST'])
def generate_logo():
    """API endpoint to start logo generation"""
    try:
        request_data = request.get_json()
        
        if not request_data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        prompt = request_data.get('prompt')
        style = request_data.get('style', 'default')
        
        if not prompt:
            return jsonify({'success': False, 'error': 'Prompt is required'}), 400
        
        task_id = str(uuid.uuid4())
        
        task_data = {
            'id': task_id,
            'prompt': prompt,
            'style': style,
            'status': PROCESSING,
            'createdAt': datetime.now().isoformat(),
            'updatedAt': datetime.now().isoformat()
        }
        
        add_logo_to_firestore(task_id, task_data)
        
        # Get the host URL from the current request context
        host_url = request.host_url.rstrip('/')
        
        # Pass the host URL to the background task
        thread = threading.Thread(target=logo_generation_task, args=(task_id, prompt, style, host_url))
        thread.daemon = True
        thread.start()
        
        return jsonify({
            'success': True, 
            'taskId': task_id,
            'message': 'Logo generation started'
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/logo/status/<task_id>', methods=['GET'])
def logo_status(task_id):
    """API endpoint to check logo generation status"""
    try:
        task = get_logo_from_firestore(task_id)
        
        if not task:
            return jsonify({'success': False, 'error': 'Task not found'}), 404
        
        return jsonify({
            'success': True,
            'task': task
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/logos', methods=['GET'])
def get_logos():
    """API endpoint to get all generated logos"""
    try:
        limit = request.args.get('limit', default=10, type=int)
        
        logos = get_logos_from_firestore(limit)
        
        return jsonify({
            'success': True,
            'logos': logos
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    os.makedirs('static', exist_ok=True)
    
    app.run(host='0.0.0.0', port=5001, debug=True) 