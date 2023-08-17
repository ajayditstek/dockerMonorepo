# dockerMonorepo

This project is a simple skeleton code for microservice architecture pattern using Nodejs, Mysql, Redis, grpc and Docker.

## Services

By now, the functional services are still decomposed into three core services. Each of them can be tested, built, and deployed independently.

### Gateway service
Gateway service is used as a gateway of the api.

### User service
Contains API related to creating and retrieving all user information.

### Notification service
Contains API related to notification information.


## How to run the project

    To run the project you need to install docker and docker-compose. 
    Here is the link to install <a href="https://phoenixnap.com/kb/install-docker-on-ubuntu-20-04">docker</a> and <a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04">docker-compose</a>

    Need to define the services on docker-compose.yml file.
    Steps:
    1. Clone the poroject.
    2. Run command 
        cd dockerMonorepo
        sudo docker-compose build //to create the images of the project.
        sudo docker-compose up -d //to run the images on deattach mode.
    3. Gateway service will run on 8080 port.
    4. User service will run on 3005 port. Grpc server for User service will run on 30051 port.
    5. Notification service will run on 3006 port. Grpc server for Notification service will run on 30061 port.

### To check if services
    1. http://localhost:8080/user/status
    2. http://localhost:8080/notification/status

#### Register User
    http://localhost:8080/user/register
#### Check rpc request from Notification to User service
    http://localhost:8080/notification/user


## Docker commands
### Stop and remove container
    sudo docker stop [container_name]
    sudo docker stop $(sudo docker ps -a -q) //to stop all container
    sudo docker rm [container_name]
    sudo docker rm $(sudo docker ps -a -q) //to stop all container

### To check logs
    sudo docker logs -f [container_name] --tail 100