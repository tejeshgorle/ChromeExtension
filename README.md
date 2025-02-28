**COMPANY** : CODTECH IT SOLUTIONS
**NAME** : TEJESH GORLE
**INTERN ID** : CT12KMU
**DOMAIN** : FULL STACK DEVELOPMENT
**BATCH DURATION** : JAN 10,2025 TO MARCH 10, 2025
**MENTOR NAME** : NEELA SANTHOSH



📊 Web Usage Analytics Chrome Extension
This Chrome extension helps users track the time spent on various websites, providing daily and weekly analytics for better productivity and time management. It stores data locally and fetches weekly insights from a backend server.

📜 Features
✅ Real-time Website Tracking – Monitors time spent on different websites.
✅ Daily Usage Summary – Displays time spent on websites within a day.
✅ Weekly Analytics – Fetches weekly data from a backend for productivity insights.
✅ Minimalist UI – Clean and user-friendly popup interface.
✅ Data Persistence – Stores daily usage locally and retrieves weekly data from MongoDB.

🛠️ Tech Stack
Frontend (Chrome Extension)
JavaScript (Vanilla JS) – Handles user interactions and data storage
HTML & CSS – For popup UI & styling
Chrome Storage API – Saves browsing data locally

Backend (Flask + MongoDB)
Flask – API for fetching weekly analytics
MongoDB – Stores website usage history
Flask-CORS – Enables secure communication between frontend and backend

🚀 Installation Guide:

🔧 Step 1: Clone the Repository
git clone https://github.com/your-username/web-usage-analytics.git
cd web-usage-analytics
🔧 Step 2: Load the Extension in Chrome
Open Chrome and go to chrome://extensions/
Enable Developer Mode (top-right corner).
Click "Load Unpacked" and select the project folder.
The extension should now be active in your browser! 🎉
🔧 Step 3: Run the Backend (Optional for Weekly Analytics)
Navigate to the backend folder:
cd backend
Install dependencies:
pip install -r requirements.txt
Start the Flask server:
python app.py
Ensure MongoDB is running and accessible.

📝 API Endpoints (Backend)
Method	Endpoint	Description
GET	/get-weekly-report	Fetches weekly website usage data.
POST	/store-data	Stores time tracking data in MongoDB.

🤝 Contributing
Contributions are welcome! Feel free to fork this repo, submit a PR, or report issues.
