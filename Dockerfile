# ---- Build Stage ----
FROM maven:3.9.6-eclipse-temurin-24 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# ---- Run Stage ----
FROM openjdk:24
WORKDIR /mywebapp
COPY --from=build /app/target/*.jar mywebapp.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "mywebapp.jar"]