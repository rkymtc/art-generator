# Logo Generator API

Simple Python backend for generating and retrieving logo designs.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up Firebase:
   - Create a project at [console.firebase.google.com](https://console.firebase.google.com/)
   - Enable Firestore
   - Download service account key and save as `firebase-credentials.json` in this directory

3. Run:
   ```
   python app.py
   ```

## API Endpoints

### Generate Logo
**POST** `/api/logo/generate`
```json
{
  "prompt": "Your logo description",
  "style": "monogram" 
}
```
Styles: default, monogram, abstract, mascot

### Check Status
**GET** `/api/logo/status/<task_id>`

### Get All Logos
**GET** `/api/logos?limit=10` 