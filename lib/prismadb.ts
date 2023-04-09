import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
// This code uses the Prisma library to create a database client and saves it in the client variable.
//The global.prismadb variable is used to save the created client so that it can be reused in other parts of the application without the need to create a new client every time.
// If the application is running in production mode (the NODE_ENV environment variable has a value of production), then the created client is saved in the global variable global.prismadb so that it can be reused when accessing the database.
// Overall, this code is used to create a database client using Prisma and optimize its reuse in different parts of the application.
