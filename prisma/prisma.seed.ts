import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const developerNames = Array.from({ length: 20 }, () => ({
    name: faker.company.name(),
  }));
  await prisma.developer.createMany({
    data: developerNames,
  });

  const developers = await prisma.developer.findMany();

  const gamesData = Array.from({ length: 1000 }, () => {
    const randomDev = developers[Math.floor(Math.random() * developers.length)];
    if (!randomDev) {
      throw new Error("No developer found to associate with the game.");
    }
    return {
      title: faker.commerce.productName(),
      genre: faker.helpers.arrayElement([
        "RPG",
        "Shooter",
        "Action",
        "Adventure",
        "Simulation",
        "Puzzle",
      ]),
      platform: faker.helpers.arrayElement(["PC", "PS5", "Xbox", "Switch"]),
      releaseDate: faker.date.past({ years: 10 }),
      developerId: randomDev.id,
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      multiplayer: faker.datatype.boolean(),
      metascore: faker.number.int({ min: 10, max: 100 }),
    };
  });

  await prisma.game.createMany({
    data: gamesData,
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
