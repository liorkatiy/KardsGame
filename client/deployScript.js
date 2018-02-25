const jsonFile = require("jsonfile");
const fs = require("fs");
const del = process.argv[2];

const f = async () => {
  const exists = await fs.existsSync("./build");
  if (exists && del) {
    try {
      console.log("deleting folder...");
      await deleteFolder("./build");
    }
    catch (e) {
      console.log(e);
    }
  }
  const config = await jsonFile.readFileSync("./src/config.json");
  config.url = config.url ?
    "" : 'http://localhost:9001';
  await jsonFile.writeFileSync("./src/config.json", config);
};

const deleteFolder = async (path) => {
  const files = await fs.readdirSync(path);
  for (let i = 0; i < files.length; i++) {
    const newPath = path + "/" + files[i];
    const stats = await fs.statSync(newPath);
    if (stats.isDirectory()) {
      await deleteFolder(newPath);
    }
    else {
      await fs.unlinkSync(newPath);
    }
  }
  await fs.rmdirSync(path);
};

f().then(() => { console.log("finished"); });