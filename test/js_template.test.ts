import fs from 'fs';
import { readFileSync } from 'jsonfile';
import path from 'path';

describe('TypeScript Template', () => {
  const jsDir = path.join(__dirname, '..', 'javascript_template');

  test('Verify that handlebars parsed the package.json', () => {
    const packageFile = readFileSync(path.join(jsDir, 'package.json'));

    expect(packageFile.name).toBe('javascript_template');
    expect(packageFile.license).toBe('MIT');
    expect(packageFile.description).toBe('javascript_bot');
    expect(packageFile.author).toBe('circleci');
    expect(packageFile.repository).toBe('https://github.com/favna/jsbot');
  });

  test('Verify token was saved correctly', () => {
    const envFile = fs.readFileSync(path.join(jsDir, '.env'), 'utf8');
    expect(envFile).toBe('BOT_TOKEN="12345"');
  });
});