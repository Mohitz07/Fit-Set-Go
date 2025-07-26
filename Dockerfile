FROM openjdk:24
WORKDIR /mywebapp
COPY target/mywebapp-0.0.1-SNAPSHOT.jar mywebapp.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "mywebapp.jar"]