FROM mysql:8.0.18

ENV MYSQL_DATABASE hello_web_api

# All scripts in /docker-entrypoint-initdb.d/ are executed
# at container startup
COPY ./initdb.d/ /docker-entrypoint-initdb.d/
