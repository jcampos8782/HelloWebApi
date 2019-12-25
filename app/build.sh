rm -rf bld
dotnet clean 
dotnet build -o bld

docker build . -t jcampos/hello-webapi
