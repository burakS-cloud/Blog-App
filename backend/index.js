import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./schema.js";

const prisma = new PrismaClient();

async function main() {
  // Prisma Queries

  // resolvers
  const resolvers = {
    Query: {
      async users() {
        const users = await prisma.user.findMany({
          include: {
            posts: {
              select: {
                title: true,
                body: true,
                id: true,
              },
            },
          },
        });
        return users;
      },
      async user(_, args) {
        const user = await prisma.user.findUnique({
          where: {
            id: +args.id,
          },
          include: {
            posts: {
              select: {
                title: true,
                body: true,
                id: true,
              },
            },
          },
        });
        console.log("user: ", user);
        if (!user) return `User not found with the id of ${args.id}`;
        return user;
      },
      async posts() {
        const posts = await prisma.post.findMany({
          include: {
            author: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        });
        return posts;
      },
    },

    Mutation: {
      async addUser(_, args) {
        console.log("args:", args);
        const { name, email } = args.user;
        try {
          const user = await prisma.user.create({
            data: {
              name: name,
              email: email,
            },
          });
          console.log("newly created user:", user);
          return user;
        } catch (error) {
          console.error("Error inserting user:", error);
          return "Error inserting user";
        }
      },
      async deleteUser(_, args) {
        console.log("args", args);
        try {
          await prisma.user.delete({
            where: {
              id: +args.id,
            },
          });
          return `Deleted the user`;
        } catch (error) {
          return `Could not delete the user`;
        }
      },
      async updateUser(_, args) {
        try {
          const user = await prisma.user.update({
            where: {
              id: +args.id,
            },
            data: {
              email: args.edits.email,
              name: args.edits.name,
            },
          });
          return user;
        } catch (error) {
          return `Could not update the user`;
        }
      },
      async addPost(_, args) {
        console.log("args:", args);
        const { title, body, id } = args.post;
        try {
          const post = await prisma.post.create({
            data: {
              title: title,
              body: body,
              author: {
                connect: {
                  id: +id,
                },
              },
            },
            select: {
              id: true,
              title: true,
              body: true,
              author: true, // Include the author field
            },
          });
          console.log("newly created post:", post);
          return post;
        } catch (error) {
          console.error("Error inserting post:", error);
          return "Error inserting post";
        }
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
