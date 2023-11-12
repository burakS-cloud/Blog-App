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
                category: true,
                subCategory: true,
                coverImage: true,
                createdAt: true,
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
                category: true,
                subCategory: true,
                coverImage: true,
                createdAt: true,
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
                userAvatar: true,
              },
            },
          },
        });
        return posts;
      },
      async post(_, args) {
        const post = await prisma.post.findUnique({
          where: {
            id: +args.id,
          },
          include: {
            author: {
              select: {
                email: true,
                name: true,
                userAvatar: true,
              },
            },
          },
        });

        if (!post) return `Post not found with the id of ${args.id}`;
        return post;
      },
    },

    Mutation: {
      async addUser(_, args) {
        console.log("args:", args);
        const { name, email, userAvatar } = args.user;
        try {
          const user = await prisma.user.create({
            data: {
              name: name,
              email: email,
              userAvatar: userAvatar,
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
        try {
          await prisma.post.deleteMany({
            where: {
              authorId: +args.id,
            },
          });

          await prisma.user.delete({
            where: {
              id: +args.id,
            },
          });

          return `Deleted the user and associated posts`;
        } catch (error) {
          console.log("error:", error);
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
              userAvatar: args.edits.userAvatar,
            },
          });
          return user;
        } catch (error) {
          return `Could not update the user`;
        }
      },
      async addPost(_, args) {
        console.log("args:", args);
        const { title, body, id, coverImage, category, subCategory } =
          args.post;
        try {
          const post = await prisma.post.create({
            data: {
              title: title,
              body: body,
              coverImage: coverImage,
              category: category,
              subCategory: subCategory,
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
              createdAt: true,
              coverImage: true,
              category: true,
              subCategory: true,
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
      async deletePost(_, args) {
        console.log("args", args);
        try {
          await prisma.post.delete({
            where: {
              id: +args.id,
            },
          });
          return `Deleted the post`;
        } catch (error) {
          return `Could not delete the post`;
        }
      },
      async updatePost(_, args) {
        try {
          const post = await prisma.post.update({
            where: {
              id: +args.id,
            },
            data: {
              title: args.edits.title,
              body: args.edits.body,
              category: args.edits.category,
              subCategory: args.edits.subCategory,
              coverImage: args.edits.coverImage,
            },
          });
          return post;
        } catch (error) {
          return `Could not update the post`;
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
