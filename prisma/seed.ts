import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando la semilla (seeding)...');

  // Ruta al archivo db.json en el frontend (ajusta si es necesario)
  const dbPath = path.resolve('../perritos-refugio-frontend/db.json');

  if (!fs.existsSync(dbPath)) {
    console.error(`❌ Error: No se encontró el archivo ${dbPath}`);
    return;
  }

  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(rawData);

  // 1. Limpiar la base de datos (opcional, cuidado en producción!)
  await prisma.successStory.deleteMany({});
  await prisma.dog.deleteMany({});
  await prisma.shelter.deleteMany({});

  console.log('🧹 Base de datos limpia.');

  // 2. Insertar Refugios
  for (const shelter of data.shelters) {
    await prisma.shelter.create({
      data: {
        id: shelter.id,
        name: shelter.name,
        logo: shelter.logo,
        image: shelter.image,
        rescuedCount: shelter.rescuedCount,
        location: shelter.location,
        state: shelter.state,
        description: shelter.description,
        mission: shelter.mission,
        contactEmail: shelter.contactEmail,
        contactPhone: shelter.contactPhone,
        urgentNeeds: shelter.urgentNeeds || '',
      },
    });
  }
  console.log('🏠 Refugios insertados.');

  // 3. Insertar Perritos
  for (const dog of data.dogs) {
    await prisma.dog.create({
      data: {
        id: dog.id,
        name: dog.name,
        age: dog.age,
        size: dog.size,
        breed: dog.breed,
        adoptionStatus: dog.adoptionStatus,
        image: dog.image,
        description: dog.description,
        color: dog.color,
        distance: dog.distance,
        shelterId: dog.shelter?.id || null,
      },
    });
  }
  console.log('🐶 Perritos insertados.');

  // 4. Historias de éxito
  if (data['success-stories']) {
    for (const story of data['success-stories']) {
      await prisma.successStory.create({
        data: story,
      });
    }
  }

  console.log('✅ Seeding completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
