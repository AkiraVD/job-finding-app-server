# Use Node.js version 16 as the base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Copy the source code to the container
COPY ./src ./src
COPY ./prisma ./prisma
COPY ./migrations ./migrations

# Expose port 3000 to the host
EXPOSE 3000

# Start the app
CMD ["yarn", "start:prod"]
