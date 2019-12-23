docker run --network HelloWebApi --expose 3306 -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=password -d mysql:8.0.18
sleep 5
mysql -h 127.0.0.1 -u root -ppassword -e "create database todo_items" > /dev/null 2>&1
mysql -h 127.0.0.1 -u root -ppassword todo_items < todo_items.dmp > /dev/null 2>&1

