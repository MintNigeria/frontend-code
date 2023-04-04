pipeline {
    agent any

    stages {
        stage('Build DockerImage & Container ') {
            steps {
               sh 'cd /var/lib/jenkins/workspace/nspm-client-fe-demo'
               sh 'sudo docker-compose -f nspm-client-fe.yml up -d '
            }
        }
    }
}
