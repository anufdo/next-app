import { createUser, getUserByEmail, hashPassword, verifyPassword } from '@/lib/auth-utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth utilities', () => {
  const testEmail = 'test@example.com';
  const testPassword = 'password123';

  beforeAll(async () => {
    // ensure clean slate
    const existing = await getUserByEmail(testEmail);
    if (existing) {
      await prisma.user.delete({ where: { email: testEmail } });
    }
    await createUser(testEmail, testPassword, 'Test User');
  });

  afterAll(async () => {
    // cleanup
    await prisma.user.delete({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('should hash and verify password correctly', async () => {
    const hashed = await hashPassword(testPassword);
    const isValid = await verifyPassword(testPassword, hashed);
    expect(isValid).toBe(true);
  });

  it('should create and retrieve user by email', async () => {
    const user = await getUserByEmail(testEmail);
    expect(user).not.toBeNull();
    expect(user?.email).toBe(testEmail);
  });
});
