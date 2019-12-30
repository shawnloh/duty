const fs = require('fs');
const path = require('path');

module.exports = (pathName) => {
  const modules ={};
  const stat =fs.lstatSync(pathName);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(pathName);
    let f; const l = files.length;
    for (let i = 0; i < l; i++) {
      f = path.join(pathName, files[i]);
      modules[`${i}`] = require(f);
    }
  } else {
    modules['0'] = require(pathName);
  }
  return modules;
};
