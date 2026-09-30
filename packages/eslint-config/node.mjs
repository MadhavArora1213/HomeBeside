import base from "./base.mjs";

export default [
  ...base,
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
];
