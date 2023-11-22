import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.create({ data: { name: "USER" } });
  await prisma.role.create({ data: { name: "ADMIN" } });
  await prisma.role.create({ data: { name: "GUEST" } });
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
