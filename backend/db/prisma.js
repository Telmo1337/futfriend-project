import {PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient();

//permite que as routes comuniquem com a base de dados