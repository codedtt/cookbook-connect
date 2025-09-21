### Cookbook-Connect
Cookbook-Connect is a modern recipe-sharing platform where users can upload their own recipes, discover new dishes by searching with ingredients they have at home, and connect with other cooking enthusiasts. This project is a comprehensive full-stack application that demonstrates the use of modern backend technologies and advanced features.

### Key Features
1. Recipe Management: Users can create, read, update, and delete their own recipes, complete with detailed ingredients and step-by-step instructions.

2. Search & Discovery: An advanced search engine powered by Elasticsearch allows users to find recipes by title, description, and even by matching ingredients they have available.

Yet to be implemented:
3. User Profiles & Social Features: Users can follow other cooking enthusiasts, rate and comment on recipes, and see the latest creations from the people they follow.

4. AI-Powered Suggestions: Integrated AI provides intelligent suggestions for recipe improvements, ingredient substitutions for dietary needs, and cooking tips.

5. Real-time Updates: Get live notifications for new ratings, comments, and new recipes from followed users without needing to refresh the page.

### Technical Stack
The application is built on a robust and scalable architecture with the following core technologies:

Backend: NestJS with TypeScript

API: GraphQL with Apollo Server for a flexible and efficient API

Database: PostgreSQL for structured data storage, managed with Prisma ORM

Search: Elasticsearch for high-performance, full-text search capabilities

Real-time: GraphQL Subscriptions and Redis for real-time features and notifications

AI: OpenAI API for intelligent recipe enhancements and suggestions

### Getting Started
Follow these steps to set up and run Cookbook-Connect on your local machine.

Prerequisites
Node.js (LTS version)

Docker & Docker Compose

Installation
Clone the repository:

Bash
```bash
git clone https://github.com/codedtt/cookbook-connect.git
cd cookbook-connect
Set up environment variables:
Create a .env file in the root directory and add your database and other service credentials.
```
Code snippet
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/cookbook-connect"
JWT_SECRET="your_jwt_secret_key"
OPENAI_API_KEY="your_openai_api_key"
Start the database and search services:
Use Docker Compose to spin up the PostgreSQL and Elasticsearch containers.
```

Bash
```bash
docker-compose up -d
Install dependencies:
```

Bash
```bash
npm install
Run database migrations:
Apply the Prisma schema to your PostgreSQL database.
```

Bash
```bash
npx prisma migrate dev --name init
Start the development server:
```
Bash
```bash
npm run start:dev
The server will be running at http://localhost:3000. You can access the GraphQL Playground at http://localhost:3000/graphql to interact with the API.
```

### API Endpoints
You can interact with the API using the GraphQL Playground. Below are a few key mutations and queries.

### login Mutation
Authenticate a user to get a JWT.
```bash
GraphQL

mutation {
  login(input: { email: "testuser@example.com", password: "password123" }) {
    access_token
  }
}
```

### createRecipe Mutation
Create a new recipe. Remember to include the Authorization header with your JWT.
```bash
GraphQL

mutation {
  createRecipe(input: {
    title: "Simple Tomato Pasta",
    description: "A quick and easy pasta dish.",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: 20,
    ingredients: [{ name: "Pasta", quantity: "200g" }],
    instructions: [{ step: 1, text: "Boil the pasta." }]
  }) {
    id
    title
    author {
      name
    }
  }
}
```

### searchRecipes Query
Find recipes based on ingredients and other filters.
```bash
GraphQL

query {
  searchRecipes(
    ingredients: ["Pasta", "Tomato"],
    difficulty: "Easy",
    cuisine: "Italian"
  ) {
    id
    title
    description
    author {
      name
    }
  }
}
```
