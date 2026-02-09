🎯 Smart Attendance Tracker Web Application

A full-stack web application that automates classroom attendance using secure authentication, role-based access, and location verification to prevent proxy or fraudulent attendance.

Built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB, the system replaces manual roll calls with a fast and reliable digital solution.

🚀 Problem Statement

Traditional attendance methods:

Manual roll calls

Time-consuming process

Proxy attendance (friends marking for others)

Difficult record management

These issues lead to:

Wasted class time

Inaccurate records

Poor tracking

👉 Smart Attendance Tracker solves this with secure and automated digital attendance.

✨ Features
👨‍🎓 Student

Secure login with credentials

Enter teacher-generated attendance code

Submit attendance for selected period

Location verification before submission

Prevents duplicate/incorrect submissions

👩‍🏫 Teacher

Generate random attendance codes

View real-time student submissions

Track attendance by subject and period

Detect students outside classroom location

Dashboard with all attendance records

👨‍💼 Admin

Add / edit / delete students

Manage roll numbers and passwords

Maintain class database

🔐 Security & Validation

JWT-based authentication

Role-based access (Student / Teacher / Admin)

Location comparison with classroom coordinates

Duplicate attendance prevention

Protected backend routes

🛠️ Tech Stack
Frontend

HTML

CSS

JavaScript (Vanilla JS)

Backend

Node.js

Express.js

Database

MongoDB

Tools

Postman (API testing)

Git & GitHub

⚙️ Installation & Setup
1️⃣ Clone repository
git clone https://github.com/minukusunilkumar1910/Smart-Attendance-Tracker
cd Smart-Attendance-Tracker

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run server
node index.js


Open in browser:

http://localhost:5000

🧠 How It Works

Teacher generates attendance code

Students log in

Student enters code

System checks:

Correct code

Correct period

Location within classroom radius

Attendance stored in MongoDB

Teacher views records instantly

📊 Key Learning Outcomes

Through this project, I learned:

Backend development with Node.js & Express

REST API design

MongoDB database handling

Authentication using JWT

Role-based access control

Location-based validation

Real-time dashboards

API testing using Postman

🎯 Future Improvements

Face recognition attendance

QR code-based marking

SMS/Email notifications

Analytics dashboard

Cloud deployment (AWS)

🔗 Repository

GitHub:
👉 https://github.com/minukusunilkumar1910/Smart-Attendance-Tracker

👨‍💻 Author

Sunilkumar Minuku
B.Tech CSE (AI/ML)
Full Stack & DevOps Enthusiast

GitHub: https://github.com/minukusunilkumar1910

LinkedIn: https://linkedin.com/in/minukusunilkumar
