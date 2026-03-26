# Build

FROM gradle:8.14.4-jdk17 AS builder
WORKDIR /app

COPY build.gradle ./
COPY setting.gradle ./

RUN gradle dependencies --no-daemon

COPY ./src ./src
RUN gardle bootjar --no-daemon

# Run

FROM openjdk:17-ea-17-slim

COPY --from=builder /app/build/libs/*.jar  /app.jar

EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]