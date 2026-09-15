/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
// Regression guard for previously rejected claims. This complements human review;
// it cannot establish whether a new company claim has been confirmed.
const rejected = /independent|structural (?:survey|condition|integrity)|line.item cost|direct.{0,8}latent|latent damage|repair man.hour|repair.hours|recovery logistics|return the aircraft to service|claims communication|specialist|objective technical|designated privacy representative|upload portal|strictly essential session cookies/ig;
const failures = [];
function check(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) check(file);
    else if (/\.(tsx?|css)$/.test(file)) {
      const matches = fs.readFileSync(file, 'utf8').match(rejected);
      if (matches) failures.push(`${file}: ${matches.join(', ')}`);
    }
  }
}
check('src');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log('PASS: previously rejected company claims are absent from source and metadata.');
