pipeline {
    agent any

    stages {
        stage('Build Docker Image ') {
            steps {
               sh 'cd /var/lib/jenkins/workspace/cdal-fe'
               sh  'sudo docker build -t nspm-client-fe .'
            }
        }
        stage('Build Docker Container ') {
            steps {
               sh 'cd /var/lib/jenkins/workspace/cdal-fe'
               sh 'sudo docker-compose -f nspm-client-fe.yml up -d --force-recreate '
            }
        }
    }
}
