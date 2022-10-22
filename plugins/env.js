const yaml = require("js-yaml");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");

function writeFileSync(configPath, content) {
  fs.writeFileSync(configPath, JSON.stringify(content, null, 2));
}

module.exports = (ctx, options) => {
  ctx.registerCommand({
    name: "env",
    optionMap: {
      "--config": "指定路径配置",
      "--name": "指定环境",
      "--cache": "生成缓存文件"
    },
    synopsisList: ["taro env --config env.yml", "taro env --name dev"],
    fn() {
      const { config, cache, name = "dev" } = ctx.runOpts.options;
      const { appPath, sourcePath } = ctx.paths;
      const configPath = config || _.get(options, "config", "env.yml");
      try {
        const doc = yaml.load(
          fs.readFileSync(path.resolve(appPath, configPath), "utf8")
        );
        if (cache) {
          writeFileSync(`${appPath}/.environment.json`, doc.env);
        }
        const currentConfig = _.get(doc, `env.${name}`);
        writeFileSync(`${sourcePath}/env.json`, currentConfig);
      } catch (e) {
        console.log(e);
        process.exit();
      }
    }
  });
};
