import from from "Angular-BeastCode/src/snippets.json";

import { adjuster } from "./adjuster";
import patch from "./patch.json";

interface From {
  prefix: string;
  description: string;
  types: string;
  body: string[];
}

interface To {
  prefix: string;
  description: string;
  types: string;
  body: string;
}

// bodyの配列を文字列化
let to: { [key: string]: To } = {};
for (const key in from) {
  to[key] = Object.assign(from[key] as From, {
    body: adjuster((from[key] as From).body.join("\n"))
  });
}

// patchの適用
console.log(JSON.stringify(Object.assign(to, patch)));
