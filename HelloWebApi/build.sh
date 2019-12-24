rm -rf bld
dotnet clean 
dotnet build -o bld

docker-compose up
