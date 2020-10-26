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
  if (!from[key]['types']) {
    if (from[key]['scope']) {
      from[key]['types'] = from[key]['scope'];
    } else {
      from[key]['types'] = 'typescript';
    }
  }
  to[key] = Object.assign(from[key] as From, {
    body: adjuster((from[key] as From).body.join("\n"))
  });
}

// patchの適用
console.log(JSON.stringify(Object.assign(to, patch)));
