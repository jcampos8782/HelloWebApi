FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /HelloWebApi

COPY *.sln .
COPY app/*.csproj ./app/
RUN dotnet restore

COPY app/. ./app/
WORKDIR /HelloWebApi/app
RUN dotnet publish -c Release -o bld

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as runtime
WORKDIR /app
COPY --from=build /HelloWebApi/app/bld ./

ENTRYPOINT ["dotnet", "HelloWebApi.dll"]
