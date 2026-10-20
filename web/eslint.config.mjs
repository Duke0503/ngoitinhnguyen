import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Clean-architecture dependency rules (docs/ARCHITECTURE.md §3):
//   app → modules/*/presentation → application → domain;  infrastructure implements application ports.
//   shared/* never depends on modules/* or app/*.
//   Modules are used through their public index ("@/modules/x"), never deep imports.
const noDeepModuleImports = {
  group: ["@/modules/*/*"],
  message: "Import other modules through their public index: '@/modules/<name>'.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/shared/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: ["@/modules/*", "@/app/*"], message: "shared/ must not depend on modules/ or app/." }] },
      ],
    },
  },
  {
    files: ["src/modules/*/domain/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["react", "react-dom", "next", "next/*"], message: "domain/ is framework-free TypeScript." },
            { group: ["@/shared/ui/*", "@/shared/layout/*"], message: "domain/ must not import UI." },
            { group: ["../application/*", "../infrastructure/*", "../presentation/*"], message: "domain/ is the innermost layer." },
            noDeepModuleImports,
          ],
        },
      ],
    },
  },
  {
    files: ["src/modules/*/application/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/shared/ui/*", "@/shared/layout/*"], message: "application/ must not import UI." },
            { group: ["../presentation/*", "../infrastructure/*"], message: "application/ depends only on domain/ and its own ports." },
            noDeepModuleImports,
          ],
        },
      ],
    },
  },
  {
    files: ["src/modules/*/infrastructure/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["../presentation/*", "@/shared/ui/*", "@/shared/layout/*"], message: "infrastructure/ must not import UI." },
            noDeepModuleImports,
          ],
        },
      ],
    },
  },
  {
    files: ["src/modules/*/presentation/**", "src/app/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [noDeepModuleImports] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
