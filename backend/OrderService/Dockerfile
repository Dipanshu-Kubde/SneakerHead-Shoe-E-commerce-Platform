# Use official OpenJDK image
FROM openjdk:21-jdk-slim

# Copy JAR file
ARG JAR_FILE=target/order-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# Run app
ENTRYPOINT ["java", "-jar", "/app.jar"]
