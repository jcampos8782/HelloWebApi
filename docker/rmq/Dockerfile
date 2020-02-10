FROM rabbitmq:3.8
RUN rabbitmq-plugins enable --offline rabbitmq_management rabbitmq_federation_management

# Enable management plugin CLI
RUN apt-get update && apt-get install python3 -y
RUN  ln -s /usr/bin/python3 /usr/bin/python

# The script can only be run after RMQ has been bootstrapped.
# For now, just copy the script into the container and manually execute after
# it is running.

# docker ps | grep rabbitmq | awk {'print $1'} | xargs -I '{}' docker exec '{}' init-exchange.sh

# TODO: Get this to run automatically after RMQ has started
COPY init-exchange.sh /usr/local/bin/init-exchange.sh
RUN chmod +x /usr/local/bin/init-exchange.sh
