# CareerPilot AI

**AI-powered Career Assistant** built with **React, Node.js, Express, MongoDB, Tailwind CSS, Groq, Pinecone, Docker, and AWS EC2**.

CareerPilot AI helps users create and improve their resumes, analyze them against job descriptions, generate cover letters, and get personalized career guidance through an AI Career Agent.

## Features

- Resume Builder with live preview
- ATS Resume Analysis
- Job description based keyword matching
- AI-powered resume suggestions
- AI Cover Letter Generator
- AI Career Agent
- Personalized career advice based on the selected resume
- RAG-based career knowledge retrieval
- Pinecone vector database integration
- OTP email authentication
- JWT-based authentication
- Secure cookie-based authentication
- Resume data stored in MongoDB
- Responsive dark-themed dashboard

## AI Career Agent

CareerPilot AI includes an AI Career Agent that can answer career-related questions based on the user's selected resume.

The Career Agent uses:

- Resume information from MongoDB
- Career-related knowledge stored in Pinecone
- RAG (Retrieval-Augmented Generation)
- Groq LLM for generating responses

The system retrieves relevant career knowledge from Pinecone and combines it with the user's resume information before generating a personalized response.

## Frontend Skills

- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- Custom Hooks
- Responsive UI Design

## Backend Skills

- Node.js
- Express.js
- REST API Development
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- Cookie-based Authentication
- OTP Email Service
- MVC-based Backend Structure

## AI / RAG

- Groq API
- Groq LLM
- Pinecone
- RAG (Retrieval-Augmented Generation)
- Vector Search
- Resume-based AI responses
- AI-powered ATS analysis
- AI Cover Letter Generation

## Database & Services

- MongoDB Atlas
- Pinecone
- Resend
- Groq

 ## 🎥 Project Demo

[▶️ Watch CareerPilot AI Demo](https://youtu.be/Dl7YRwgw-KU)

The video demonstrates the main features and user flow of CareerPilot AI,
including resume building, ATS analysis, AI Career Agent, RAG-based
responses, and cover letter generation.

## Deployment

The application is containerized using Docker and deployed on an AWS EC2 instance.

### Deployment Architecture

GitHub
↓
AWS EC2
↓
Docker
↓
Node.js / Express
├── React Production Build
└── REST APIs
↓
MongoDB Atlas
Groq API
Pinecone
Resend

## Docker

The application uses a multi-stage Docker build.

The frontend is first built using Vite and the production build is then served through the Node.js/Express backend.

Docker helps keep the application environment consistent between development and production.

## Future Improvements

- Google Sign-In / Google Authentication
- Multiple resume templates
- PDF export support
- Resume sharing links
- Job-specific resume optimization
- Improved AI career recommendations
- Job search and application tracking

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, Bcrypt, Cookies, OTP |
| AI | Groq |
| RAG | Pinecone |
| Email | Resend |
| Deployment | Docker, AWS EC2 |
| Version Control | Git, GitHub |

## Author

**Anshu**


