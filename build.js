const { build } = require("esbuild");

const base = {
  entryPoints: ["./input.js"],
  bundle: true,
  minifySyntax: true
};

build({ ...base, outfile: "./output-1.js", });
build({ ...base, outfile: "./output-2.js", target: "es2015" });

/* 
{
  "compilerOptions": {
    "target": "es2015",
    "lib": ["esnext"],
    "allowJs": false,
    "strict": true,
    "moduleResolution": "node",
    "noEmit": true
  }
}
 */
