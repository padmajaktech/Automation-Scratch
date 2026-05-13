export function randomEmail(): string {
  return `user_${Date.now()}_${Math.floor(Math.random() * 9999)}@test.com`;
}

export function randomName(): string {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
  return names[Math.floor(Math.random() * names.length)];
}

export function randomString(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}