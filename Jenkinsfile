pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                dir('/var/lib/jenkins/workspace/nspm-client-fe-demo') {
                    sh 'sudo docker-compose -f nspm-client-fe.yml build'
                }
            }
        }
        stage('Build Docker Container') {
            steps {
                dir('/var/lib/jenkins/workspace/nspm-client-fe-demo') {
                    sh 'sudo docker-compose -f nspm-client-fe.yml up -d'
                }
            }
        }
    }
}
