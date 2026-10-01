import { hashPassword, verifyPassword } from './password.scrypt.js';

describe('scrypt password helpers', () => {
  it('round-trips a password', async () => {
    const stored = await hashPassword('correct horse battery staple');
    expect(stored.startsWith('scrypt$N=16384,r=8,p=1$')).toBe(true);
    await expect(verifyPassword('correct horse battery staple', stored)).resolves.toBe(true);
  });

  it('rejects a wrong password', async () => {
    const stored = await hashPassword('correct horse battery staple');
    await expect(verifyPassword('wrong-password', stored)).resolves.toBe(false);
  });

  it('rejects malformed stored hashes without throwing', async () => {
    await expect(verifyPassword('anything', 'plain-text')).resolves.toBe(false);
    await expect(verifyPassword('anything', '')).resolves.toBe(false);
    await expect(verifyPassword('anything', 'scrypt$N=16384,r=8,p=1$onlytwo')).resolves.toBe(false);
  });

  it('rejects a tampered hash', async () => {
    const stored = await hashPassword('correct horse battery staple');
    const [header, salt, hash] = stored.split('$');
    const tampered = `${header}$${salt}$${Buffer.from('deadbeef', 'hex').toString('base64')}${hash.slice(4)}`;
    await expect(verifyPassword('correct horse battery staple', tampered)).resolves.toBe(false);
  });

  it('produces a unique hash per call (salted)', async () => {
    const first = await hashPassword('same-password');
    const second = await hashPassword('same-password');
    expect(first).not.toEqual(second);
  });
});
