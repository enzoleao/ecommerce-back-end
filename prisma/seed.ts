import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const response = await prisma.roles.createMany({
    data: [
      { id: 0, name: "user" },
      { id: 1, name: "admin" },
    ],
  });
  console.log({ response });
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
