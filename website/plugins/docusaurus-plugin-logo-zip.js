/**
 * Bundles the logo assets into a single downloadable archive at build time.
 *
 * The logotype page used to be a wall of images you had to right-click one by one.
 * Generating the archive here rather than committing it keeps it from drifting out of
 * sync with `static/img/logo/`, which is the canonical source of these files.
 *
 * Writes a ZIP with no dependencies: `zlib.deflateRawSync` plus the container format by
 * hand, so the build does not need a `zip` binary and works the same on every platform.
 */
const fs = require('node:fs');
const path = require('node:path');
const { deflateRawSync } = require('node:zlib');

const SOURCE_DIR = path.join('static', 'img', 'logo');
const OUTPUT_NAME = 'verdaccio-logos.zip';
// `uk/` is a themed variant, not part of the official logotype. The files stay on disk
// because the site favicon points at one of them, but they are not offered as a download.
const EXCLUDED_DIRS = new Set(['uk']);
// the header lockup is not offered either; same reasoning as `uk/`
const EXCLUDED_PREFIXES = ['logo-small-header-bottom'];

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ -1) >>> 0;
}

function collectFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return EXCLUDED_DIRS.has(entry.name) ? [] : collectFiles(full, base);
    }
    // .DS_Store and friends have no business in a download
    if (entry.name.startsWith('.') || EXCLUDED_PREFIXES.some((p) => entry.name.startsWith(p))) {
      return [];
    }
    return [{ name: path.relative(base, full).split(path.sep).join('/'), full }];
  });
}

function buildZip(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const file of files) {
    const content = fs.readFileSync(file.full);
    const deflated = deflateRawSync(content);
    const nameBuf = Buffer.from(file.name, 'utf8');
    const crc = crc32(content);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0, 6); // flags
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt16LE(0, 10); // mod time — fixed, so the archive is reproducible
    local.writeUInt16LE(0x21, 12); // mod date (1980-01-01)
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(deflated.length, 18);
    local.writeUInt32LE(content.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, deflated);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4); // version made by
    central.writeUInt16LE(20, 6); // version needed
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0x21, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(deflated.length, 20);
    central.writeUInt32LE(content.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);

    offset += local.length + nameBuf.length + deflated.length;
  }

  const centralBuf = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...locals, centralBuf, end]);
}

module.exports = function logoZipPlugin(context) {
  return {
    name: 'docusaurus-plugin-logo-zip',
    async postBuild({ outDir }) {
      const sourceDir = path.join(context.siteDir, SOURCE_DIR);
      const files = collectFiles(sourceDir).sort((a, b) => a.name.localeCompare(b.name));
      if (files.length === 0) {
        throw new Error(`[logo-zip] no logo assets found in ${SOURCE_DIR}`);
      }
      const zip = buildZip(files);
      fs.writeFileSync(path.join(outDir, OUTPUT_NAME), zip);
      console.log(
        `[logo-zip] ${OUTPUT_NAME}: ${files.length} files, ${(zip.length / 1024).toFixed(0)} KB`
      );
    },
  };
};
