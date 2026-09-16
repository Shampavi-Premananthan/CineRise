import { PrismaClient, Role, UserStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const connectionString =
  process.env.DATABASE_URL || "postgresql://postgres:yourpassword@localhost:5432/cinerise_db";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  const defaultPassword = "Password@123";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const usersToSeed = [
    {
      name: "Anand Filmmaker",
      email: "filmmaker@cinerise.com",
      passwordHash,
      role: Role.FILMMAKER,
      preferredLanguage: "ta",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      status: UserStatus.ACTIVE,
    },
    {
      name: "Priya Cinematographer",
      email: "crew@cinerise.com",
      passwordHash,
      role: Role.CREW,
      preferredLanguage: "en",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      status: UserStatus.ACTIVE,
    },
    {
      name: "Indie Cinema Guild",
      email: "org@cinerise.com",
      passwordHash,
      role: Role.ORGANIZATION,
      preferredLanguage: "en",
      profileImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300",
      status: UserStatus.ACTIVE,
    },
    {
      name: "CineRise Administrator",
      email: "admin@cinerise.com",
      passwordHash,
      role: Role.ADMIN,
      preferredLanguage: "en",
      profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300",
      status: UserStatus.ACTIVE,
    },
  ];

  for (const userData of usersToSeed) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        role: userData.role,
        preferredLanguage: userData.preferredLanguage,
        profileImage: userData.profileImage,
        status: userData.status,
      },
      create: userData,
    });

    console.log(` seeded user: ${user.name} (${user.email}) - Role: ${user.role}`);
  }

  console.log(" Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
