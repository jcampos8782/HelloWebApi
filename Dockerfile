FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /HelloWebApi

COPY *.sln .
COPY app/*.csproj ./app/
RUN dotnet restore

COPY app/. ./app/
WORKDIR /HelloWebApi/app
RUN dotnet publish -c Release -o bld

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as runtime

# Install FileBeat to supply logs to Logstash
## TODO: This should be done with Packer
RUN apt-get update
RUN apt-get install gnupg -y
RUN curl https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
RUN echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-7.x.list
RUN apt-get update && apt-get install filebeat

# Run as a service
RUN update-rc.d filebeat defaults 95 10

WORKDIR /app
COPY --from=build /HelloWebApi/app/bld ./

ENTRYPOINT ["dotnet", "HelloWebApi.dll"]
