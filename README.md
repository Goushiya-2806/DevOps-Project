# Student Management – DevOps Project

REST API + small web UI (Node.js/Express, in-memory storage).

## Run locally
    npm install
    npm start          # http://localhost:3000
    npm test           # Jest + Supertest (4 tests)

## API
| Method | Path | Description |
|---|---|---|
| GET | /students | List students |
| GET | /students/:id | Get one |
| POST | /students | Create `{name,email,course}` |
| PUT | /students/:id | Update |
| DELETE | /students/:id | Delete |
| GET | /health | Health check |

## 1. Git & GitHub
    git init
    git status
    git add .
    git commit -m "Initial commit: student management app"
    git branch -M main
    git remote add origin https://github.com/<your-username>/student-management.git
    git push -u origin main

    # basic workflow demo
    git checkout -b feature/update-readme
    git add README.md && git commit -m "Update README"
    git checkout main && git merge feature/update-readme
    git log --oneline
    git push

## 2. Jenkins
1. Install plugins: Git, Pipeline, NodeJS.
2. Manage Jenkins > Tools > add NodeJS installation named `node18`.
3. Ensure the jenkins user can run docker: `sudo usermod -aG docker jenkins` then restart Jenkins.
4. New Item > Pipeline > "Pipeline script from SCM" > Git > your repo URL > branch `main` > Script Path `Jenkinsfile`.
5. Build Now (optionally enable "GitHub hook trigger" / Poll SCM `H/5 * * * *`).

## 3. Docker
    docker build -t student-app:latest .
    docker run -d -p 3000:3000 --name student-app student-app:latest
    docker ps
    docker logs student-app
    # open http://localhost:3000

## 4. Kubernetes (Minikube example)
    minikube start
    eval $(minikube docker-env)          # build image inside minikube
    docker build -t student-app:latest .
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl get pods,svc
    minikube service student-app-service --url

Docker Desktop Kubernetes: after applying, open http://localhost:30080.

## 5. Automated tests
`tests/student.test.js` covers create, list, validation (400) and delete (204/404).
