# Use the official Go image as a base
FROM golang:1.21.6-alpine3.19 AS build-env

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application source code
COPY jtumidanski.com/rsvp/. .

# Build the Go binary
RUN go build -o main .

# Use a lightweight image for the final build
FROM alpine:3.19

# Copy the binary from the build stage to the final image
COPY --from=build-env /app/main .

# Expose the port on which your Go backend will run
EXPOSE 8080

# Command to start the Go server
CMD ["./main"]
