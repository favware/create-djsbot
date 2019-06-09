import fs from 'fs';
import { readFileSync } from 'jsonfile';
import path from 'path';

describe('TypeScript Template', () => {
  const tsDir = path.join(__dirname, '..', 'typescript_template');

  test('Verify that handlebars parsed the package.json', () => {
    const packageFile = readFileSync(path.join(tsDir, 'package.json'));

    expect(packageFile.name).toBe('typescript_template');
    expect(packageFile.license).toBe('MIT');
    expect(packageFile.description).toBe('typescript_bot');
    expect(packageFile.author).toBe('circleci');
    expect(packageFile.repository).toBe('https://github.com/favna/tsbot');
  });

  test('Verify token was saved correctly', () => {
    const envFile = fs.readFileSync(path.join(tsDir, '.env'), 'utf8');
    expect(envFile).toBe('BOT_TOKEN="12345"');
  });
});