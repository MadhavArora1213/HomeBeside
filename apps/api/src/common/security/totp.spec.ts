import { base32Decode, base32Encode, generateTotpSecret, totpAuthUrl, totpToken, verifyTotp } from './totp.js';

const RFC_SECRET = base32Encode(Buffer.from('12345678901234567890'));

describe('totp helpers', () => {
  it('round-trips base32', () => {
    const buffer = Buffer.from('hello world, base32!');
    expect(base32Decode(base32Encode(buffer))).toEqual(buffer);
  });

  it('matches the RFC 6238 SHA1 test vector (6-digit truncation)', () => {
    expect(totpToken(RFC_SECRET, 59_000)).toBe('287082');
  });

  it('accepts the current code and rejects a wrong one', () => {
    const secret = generateTotpSecret();
    const code = totpToken(secret);
    expect(verifyTotp(code, secret)).toBe(true);
    expect(verifyTotp('000000', secret)).toBe(false);
    expect(verifyTotp('12345', secret)).toBe(false);
  });

  it('accepts a code from the adjacent time step only', () => {
    const secret = generateTotpSecret();
    const now = 1_790_000_000_000;
    const previousStep = totpToken(secret, now - 30_000);
    expect(verifyTotp(previousStep, secret, 1, now)).toBe(true);
    const twoStepsAgo = totpToken(secret, now - 60_000);
    expect(verifyTotp(twoStepsAgo, secret, 1, now)).toBe(false);
  });

  it('builds an otpauth URL', () => {
    const url = totpAuthUrl('admin@example.com', 'SECRETVALUE', 'HomeBeside');
    expect(url.startsWith('otpauth://totp/HomeBeside%3Aadmin%40example.com?')).toBe(true);
    expect(url).toContain('secret=SECRETVALUE');
    expect(url).toContain('issuer=HomeBeside');
  });
});
