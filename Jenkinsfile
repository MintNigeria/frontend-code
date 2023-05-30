pipeline {
    agent any

    stages {
       stage('Clear System') {
            steps {
                dir('/var/lib/jenkins/workspace/ngmintclient') {
                    sh 'docker system prune -f -a --volumes'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                dir('/var/lib/jenkins/workspace/ngmintclient') {
                    sh 'docker-compose -f nspm-client-fe.yml build'
                }
            }
        }
        stage('Build Docker Container') {
            steps {
                dir('/var/lib/jenkins/workspace/ngmintclient') {
                    sh 'docker-compose -f nspm-client-fe.yml up -d --force-recreate'
                }
            }
        }
    }
}
