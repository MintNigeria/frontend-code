pipeline {
    agent any

    stages {
        stage('Build Docker Image ') {
            steps {
               sh 'cd /var/lib/jenkins/workspace/nspm-client-fe-demo'
               sh 'sudo docker-compose -f nspm-client-fe.yml build '
            }
        }   stage('Build Dockeer Container ') {
            steps {
               sh 'cd /var/lib/jenkins/workspace/nspm-client-fe-demo'
               sh 'sudo docker-compose -f nspm-client-fe.yml up -d --force-recreate  '
            }
        }
    }
}
