import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = () => readFileSync(resolve(root, 'index.html'), 'utf8');
const app = () => readFileSync(resolve(root, 'app.js'), 'utf8');

test('liefert eine semantische Sprachauswahl', () => {
  const source = html();
  assert.match(source, /<main/);
  assert.match(source, /id="language-screen"/);
  assert.match(source, /id="language-options"/);
  assert.match(source, /id="language-search"/);
});

test('enthält 15 neu erstellte, hochauflösende Illustrationen', () => {
  for (let page = 1; page <= 15; page += 1) {
    const name = `assets/step-${String(page).padStart(2, '0')}.webp`;
    assert.equal(existsSync(resolve(root, name)), true, `${name} fehlt`);
  }
  const manifest = JSON.parse(readFileSync(resolve(root, 'assets/manifest.json'), 'utf8'));
  assert.equal(manifest.length, 15);
  assert.ok(manifest.every(({ width, height, generated }) => width >= 300 && height >= 750 && generated === true));
});

test('stellt rund 40 europäische und gängige Sprachen mit je 15 Schritten bereit', async () => {
  const i18n = await import(`../translations.mjs?test=${Date.now()}`);
  assert.equal(i18n.languages.length, 41);
  assert.deepEqual(i18n.languages.map(({ code }) => code), [
    'de', 'en', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'cs', 'sk', 'sl', 'hr', 'bs', 'sr',
    'bg', 'ro', 'hu', 'el', 'sv', 'da', 'fi', 'et', 'lv', 'lt', 'ga', 'mt', 'lb', 'is',
    'no', 'uk', 'ru', 'tr', 'ar', 'sq', 'mk', 'ka', 'hy', 'az', 'be', 'ca', 'cnr'
  ]);
  for (const { code, nativeName } of i18n.languages) {
    assert.ok(nativeName.length > 1, `${code}: Eigenbezeichnung fehlt`);
    assert.equal(i18n.translations[code].steps.length, 15, `${code}: keine 15 Schritte`);
    assert.ok(i18n.translations[code].ui.back, `${code}: UI fehlt`);
  }
  assert.equal(i18n.languages.find(({ code }) => code === 'ar').dir, 'rtl');
});

test('erzeugt die Sprachwahl dynamisch und unterstützt Suche', () => {
  const source = app();
  assert.match(source, /language-search/);
  assert.match(source, /languages\.forEach/);
  assert.match(source, /document\.documentElement\.dir/);
});

test('verwendet die neue Wegkarten-Navigation', () => {
  assert.match(html(), /id="route-map"/);
  assert.match(html(), /id="route-points"/);
  assert.match(app(), /renderRoute/);
});

test('unterstützt Navigation, Sprachwechsel und lokale Speicherung', () => {
  const source = app();
  assert.match(source, /localStorage\.setItem/);
  assert.match(source, /history\.replaceState/);
  assert.match(source, /next-button/);
  assert.match(source, /previous-button/);
  assert.match(source, /language-button/);
});

test('berücksichtigt Tastatur und reduzierte Bewegung', () => {
  assert.match(app(), /ArrowRight/);
  assert.match(app(), /ArrowLeft/);
  const css = readFileSync(resolve(root, 'styles.css'), 'utf8');
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
}
);
