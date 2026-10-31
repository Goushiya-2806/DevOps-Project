pipeline {
    agent any
    tools { nodejs 'node18' }   // configure under Manage Jenkins > Tools > NodeJS
    environment { IMAGE = "student-app:${env.BUILD_NUMBER}" }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Install')  { steps { sh 'npm install' } }
        stage('Test')     { steps { sh 'npm test' } }
        stage('Docker Build') { steps { sh 'docker build -t $IMAGE -t student-app:latest .' } }
    }
    post {
        success { echo 'Build succeeded' }
        failure { echo 'Build failed' }
    }
}
