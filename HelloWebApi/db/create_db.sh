#
Creates the database and its tables
mysql -h 127.0.0.1 -u root -ppassword -e "create database todo_items" > /dev/null 2>&1
mysql -h 127.0.0.1 -u root -ppassword todo_items < todo_items.dmp > /dev/null 2>&1
