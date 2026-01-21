# BidWise ⚖️  
### Intelligent Bidding & Proposal Ranking Platform

BidWise is a full-stack **MERN application** designed to streamline the bidding process between service seekers and companies. By integrating a **Python-based NLP engine**, the platform automatically ranks incoming bids based on project relevance and value. With **Socket.io** integration, BidWise ensures real-time transparency by delivering instant notifications whenever a proposal is submitted.

---

## 🌟 Features

- **AI-Powered Bid Ranking**  
  Automatically evaluates and scores proposals using a Python NLP engine to identify the best match for each service request.

- **Real-Time Notifications**  
  Instant *Live Toast* alerts powered by Socket.io to notify seekers of new bids and updates.

- **Dual-Dashboard Interface**  
  Dedicated workflows for:
  - **Service Seekers** – Post and manage service requests  
  - **Companies** – Submit bids and track proposal status

- **Secure Authentication**  
  Robust security using JWT (JSON Web Tokens) with protected API routes.

- **Interactive Proposal Tracking**  
  Visual comparison of incoming bids with AI-generated match scores.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Local / Atlas)  
- **AI / ML:** Python (Flask / FastAPI), NLP matching logic  
- **Real-Time:** Socket.io  
- **Styling & UX:** Lucide-React, React-Hot-Toast  

---

## 🧱 System Architecture

- **Client:** React (Vite-powered, responsive UI)  
- **Core API:** Node.js + Express (Business logic & Authentication)  
- **AI Microservice:** Python Engine (Bid ranking & NLP processing)  
- **Communication:** WebSockets (Real-time events)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Laksha10/Bidwise--Intelligent-Bidding-Proposal-Platform.git
cd Bidwise--Intelligent-Bidding-Proposal-Platform
```

### 2. Install & Run Services:

Backend (Node):

```bash
cd server
npm install
npm run dev
```

Frontend (React):
```bash
cd client
npm install
npm run dev
```
AI Engine (Python):
```bash
cd ai_engine
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
----
## 🧭 How to Use BidWise

- **🏗️ Post a Request**
Service seekers can post detailed service requests specifying requirements, scope, and budget.

- **📝 Place a Bid**
Companies can browse open requests and submit structured proposals.

- **🤖 AI Ranking**
The system analyzes proposal text against the request and assigns an AI-generated Match Score.

- **🔔 Live Notifications**
Seekers receive instant toast notifications whenever a new bid is submitted.
