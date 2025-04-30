# User Management CRUD Application

A comprehensive full-stack CRUD application for managing user data with React frontend, Express.js/Node.js backend, MongoDB database, containerized with Docker and deployed on Kubernetes.

![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

## ✨ Features

- **User Management**: Create, read, update, and delete user records
- **Responsive UI**: Modern interface that works across desktop and mobile devices
- **RESTful API**: Well-structured backend API endpoints 
- **Containerized**: Full Docker support for consistent development and deployment
- **Kubernetes Ready**: Production-grade deployment configuration
- **MongoDB Integration**: Scalable data persistence

## 📋 Tech Stack

### Frontend
- React with javascript
- Modern pods architecture
- Responsive design

### Backend
- Node.js with Express
- RESTful API design
- MongoDB integration

### DevOps
- Docker containerization
- Kubernetes orchestration
- MongoDB Atlas for database hosting

## 🏗️ Project Structure

```
my-app/
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── lib/               # Utility functions and API services
│   │   ├── pages/             # Page components
│   │   ├── App.tsx            # Main application component with routing
│   │   └── main.tsx           # Application entry point
│   └── Dockerfile             # Frontend container configuration
│
├── backend/                   # Express.js backend application
│   └── Dockerfile             # Backend container configuration
│
└── k8s/                       # Kubernetes configuration files
    ├── frontend-deployment.yaml
    ├── backend-deployment.yaml
    ├── db-deployment.yaml
    ├── frontend-service.yaml
    ├── backend-service.yaml
    └── db-service.yaml
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and cluster
- [Kubernetes](https://kubernetes.io/) cluster (local via [Minikube](https://minikube.sigs.k8s.io/) or remote)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) configured
- [Docker Hub](https://hub.docker.com/) account (e.g., `nktomer45`)

### Environment Variables

The application requires the following environment variables:

**Frontend:**
- `VITE_API_URL`: Backend API URL

**Backend:**
- `DB_URL`: MongoDB connection string
- `PORT`: Application port (defaults to 5000)

## 🔐 Deployment Steps

### 1. Create MongoDB Atlas Secret

```bash
kubectl create secret generic mongodb-atlas-secret \
  --from-literal=mongo-uri="mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority"
```

### 2. Build & Push Docker Images

#### Backend
```bash
cd backend
docker build -t nktomer45/backend:latest .
docker push nktomer45/backend:latest
```

#### Frontend
```bash
cd frontend
docker build -t nktomer45/frontend:latest .
docker push nktomer45/frontend:latest
```

### 3. Start Kubernetes Cluster (Local Development)

```bash
minikube start
minikube status
```

### 4. Apply Kubernetes Manifests

Individual services:
```bash
kubectl apply -f k8s/db-deployment.yaml
kubectl apply -f k8s/db-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

Or all at once:
```bash
kubectl apply -f k8s/
```

### 5. Verify Deployment

Check pod status:
```bash
kubectl get pods
kubectl get services
```

### 6. Access the Application

#### Frontend
```bash
kubectl port-forward service/frontend-service 8080:80
```
Access the application at [http://localhost:8080](http://localhost:8080)

#### Backend API
```bash
kubectl port-forward service/backend-service 5000:5000
```
API available at [http://localhost:5000](http://localhost:5000)

## 🧪 Testing and Scaling

### Scale Backend Services
```bash
kubectl scale deployment backend-deployment --replicas=3
kubectl get pods -l app=backend
```

## 🛠️ Development

To run the application locally without Kubernetes:

1. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
