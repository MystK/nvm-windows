const fetch = require('node-fetch');
const mkdirp = require('mkdirp');
const fs = require('fs');
const del = require('del');
const child_process = require('child_process');

const tempFolderPath = process.env.TEMP + '/nvm-apham/';
const npmZipPath = tempFolderPath + 'npm.zip';

const writeFile = (stream, path) => new Promise(res => {
  const fileStream = fs.createWriteStream(path);
  stream
    .pipe(fileStream)
    .on('finish', res)
});
(async () => {
  del.sync([ tempFolderPath + '/**' ], { force: true });
  // const res = await fetch('https://nodejs.org/dist/index.json');
  // console.log(await res.json());
  const npmRes = await fetch('https://github.com/npm/cli/archive/v6.2.0.zip');
  mkdirp.sync(tempFolderPath + '/npm/');
  await writeFile(npmRes.body, npmZipPath);

  child_process.execFileSync(__dirname + '/7z/7za.exe', ['x', npmZipPath ], { cwd: tempFolderPath + 'npm/' })
})();
