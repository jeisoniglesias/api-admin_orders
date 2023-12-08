const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

export function generateResetLink(token: string, id: string): string {
  return `${CLIENT_URL}/auth/reset-password?token=${token}&id=${id}`;
}
