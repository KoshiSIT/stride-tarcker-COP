const parser = require("@babel/parser");
const path = require("path");
const glob = require("glob");
const fs = require("fs-extra");
const dist = "./Asts";
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}
const parseCode = (code) => {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });
  return ast;
};
const parseAllFiles = () => {
  const sourceDir = "../";
  const ignorePatterns = [
    "node_modules", // node_modules ディレクトリを除外
    "Analysis",
    "android",
    "ios",
    "assets",
    "HOME",
    "iosnpx",
    ".expo",
    "babel.config.js",
    "firebase.json",
    "index.js",
    "metro.config.js",
    "package.json",
    "package-lock.json",
    "yarn.lock",
  ];

  const isIgnored = (filePath) => {
    return ignorePatterns.some((pattern) => filePath.includes(pattern));
  };

  const getAllFiles = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (isIgnored(filePath)) return;

      fileList = fs.statSync(filePath).isDirectory()
        ? getAllFiles(filePath, fileList)
        : fileList.concat(filePath);
    });

    return fileList;
  };

  const files = getAllFiles(sourceDir).filter((file) => file.endsWith(".js"));
  files.forEach((file) => {
    console.log(file);
    const stat = fs.statSync(file);
    if (stat.isFile()) {
      const code = fs.readFileSync(file, "utf-8");
      const ast = parseCode(code);
      const outPutPath = path.join(
        dist,
        path.basename(file).replace(/\.js$/, ".json")
      );
      console.log(outPutPath);
      fs.writeFileSync(outPutPath, JSON.stringify(ast, null, 2));
    }
  });
};

const parseDir = () => {
  const source = "../components";
  const dist = "./Asts";
  fs.readdir(source, (err, files) => {
    if (err) {
      console.error("file read error:", err);
      return;
    }
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        const filePath = path.join(source, file);
        const code = fs.readFileSync(filePath, "utf-8");
        const ast = parseCode(code);
        const outPutPath = path.join(dist, file.replace(/\.js$/, ".json"));
        fs.writeFileSync(outPutPath, JSON.stringify(ast, null, 2));
      }
    });
  });
};
const parseFile = () => {
  // const file = "./App.js";
  const file = "../screens/CommunityScreen.js";
  const code = fs.readFileSync(file, "utf-8");
  let resultAST;
  try {
    resultAST = parseCode(code);
  } catch (parseError) {
    console.log(`Error parsing ${file}:`, parseError);
  }
  astToJSONFile(resultAST);
};

const astToJSONFile = (ast) => {
  fs.writeFileSync("../ast.json", JSON.stringify(ast, null, 2));
};

// parseFile();
// parseDir();
parseAllFiles();
