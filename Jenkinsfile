pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                dir('/var/lib/jenkins/workspace/ngmintclient') {
                    sh 'sudo docker-compose -f nspm-client-fe.yml build'
                }
            }
        }
        stage('Build Docker Container') {
            steps {
                dir('/var/lib/jenkins/workspace/ngmintclient') {
                    sh 'sudo docker-compose -f nspm-client-fe.yml up -d'
                }
            }
        }
    }
}
