# Welcome to my NBA fantasy stats app
  
## Directions

    1. Search and select up to 5 players
    2. Browse through each players season averages
    3. Compare players stats visually by using the graph

## Scoring

Fantasy scoring on this site are based on ESPN's old scoring style calculated as follows:
Points + Rebounds + Steals + Blocks + (Field Goals Made - Field Goals Attemped) + (Free Throws Made - Free Throws Attemped) + (Assists - Turnovers)

 <br />
 <br />

## Local Development

---

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

## Making local changes

```bash
# install dependencies
npm install
# start dev server
npm run dev
# bundle for production (the build output will be placed in the /dist folder)
npm run build
```

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```

This app was made possible with the [BallDontLie API](https://www.balldontlie.io) created by Github user [ynnadkrap](https://www.github.com/ynnadkrap)