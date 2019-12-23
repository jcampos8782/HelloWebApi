docker rm -f $(docker ps | egrep 'todo-list$' | awk '{print $1}')
./docker-run.sh

