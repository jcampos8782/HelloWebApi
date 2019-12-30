FROM rabbitmq:3.8
RUN rabbitmq-plugins enable --offline rabbitmq_management rabbitmq_federation_management

# Enable management plugin CLI
RUN apt-get update && apt-get install python3 -y
RUN  ln -s /usr/bin/python3 /usr/bin/python
