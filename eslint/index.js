import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import { reactRules } from "./rules/react";
import { tsRules } from "./rules/typescript";
import { securityRules } from "./rules/security";
import { styleRules } from "./rules/style";
import { complexityRules } from "./rules/complexity";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      ...reactRules,
      ...tsRules,
      ...securityRules,
      ...styleRules,
      ...complexityRules,
    },
  },
]);

export default eslintConfig;
