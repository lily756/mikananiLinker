const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).parse();
const fs = require("node:fs");
const path = require("node:path");
const { tify, sify } = require("chinese-conv");

function removeFansub(name) {
  name = name.trim();
  const pattern = /(\[|【).*?(\]|】)/g;
  const report = name.match(pattern);
  if (Array.isArray(report)) {
    if (report[1].indexOf("番") >= 0) {
      // console.log(report[0]+report[1])
      name = name.replace(report[0], "");
      name = name.replace(report[1], "");
      return name;
    } else {
      name = name.replace(report[0], "");
      return name;
    }
  }
}

function getBanguName(name) {
  if (name[0] === " ") {
    name = name.trim();
    const index = name.indexOf(" - ");
    if (index >= 0) {
      return { name: name.slice(0, index), extra: name.slice(index) };
    } else {
      return {
        name: name.slice(0, name.indexOf("[")).trim(),
        extra: name.slice(name.indexOf("[")),
      };
    }
  } else if (name[0] === "[") {
    const index = name.indexOf("]");
    return { name: name.slice(1, index), extra: name.slice(index + 1) };
  } else {
  }
}

function getEpisode(name) {
  const pattern1 = /\s-\s[0-9]*?(v[0-9])*\s/g;
  const pattern2 = /\[[0-9]*?(v[0-9])*\]/g;
  if (pattern1.test(name)) {
    const ep = name.match(pattern1);
    return ep[0].replace(/\s-\s|v[0-9]*/g, "").trim();
  } else if (pattern2.test(name)) {
    const ep = name.match(pattern2);
    return ep[0].replace(/\[|\]|v[0-9]*/g, "").trim();
    // return name.match(pattern2)
  }
}

function getfileExtra(name) {
  return path.extname(name);
}

function echoHelp() {}

function main() {
  if (argv.src && argv.dst) {
    const src = path.normalize(String(argv.src));
    const dst = path.normalize(String(argv.dst));
    // console.log(src,dst)
    if (fs.statSync(src).isDirectory() && fs.statSync(dst).isDirectory()) {
      const files = fs.readdirSync(src, { encoding: "utf8" });
      // console.log(files)
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (!file.startsWith("._")) {
          const nofansubfilename = removeFansub(file);
          const { name, extra } = getBanguName(nofansubfilename);
          const ep = getEpisode(extra);
          const fileExtra = getfileExtra(file);
          let newBangu = false;
          try {
            if(argv.zht){
                fs.statSync(path.join(dst, tify(name))).isDirectory();
            }else{
                fs.statSync(path.join(dst, sify(name))).isDirectory();
            }
          } catch (error) {
            fs.mkdirSync(path.join(dst, sify(name)))
          }

        }
      }
    } else {
      console.log("check src and dst directory is a directory");
    }
  } else {
    echoHelp();
  }
}

main();

module.exports = {
  removeFansub,
  getBanguName,
  getEpisode,
  getfileExtra,
};
