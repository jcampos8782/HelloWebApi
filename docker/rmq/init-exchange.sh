#!/bin/bash

ln -s /var/lib/rabbitmq/mnesia/rabbit@rmq01-plugins-expand/rabbitmq_management-3.8.2/priv/www/cli/rabbitmqadmin \
  /usr/bin/rabbitmqadmin

chmod +x /usr/bin/rabbitmqadmin

rabbitmqadmin declare exchange name=app.logs type=fanout durable=true
