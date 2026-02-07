Merged package.json for Bookings, irctcSearch and my-react-app

Merge rules applied:
- `name`: set to `irctc-merged` to indicate the combined package.
- `version`: set to `1.0.0` as an initial merged version.
- `scripts`: original project scripts were prefixed with the project folder name to avoid collisions, e.g. `bookings:dev`, `irctcSearch:dev`, `my-react-app:dev`.
  - Each script simply `cd` into the respective project folder and runs the original script (so you can run each app individually from the root).
- `dependencies` / `devDependencies`: keys from all three files were combined. For packages present in multiple places, the highest/most recent semver found across the three files was chosen.

How to use:
- Install dependencies for the merged manifest (optional):

  ```powershell
  cd c:/CDAC/PROJECT/IRCTC-2.0
  npm install
  ```

- Run a project's dev server from the merged root, for example:

  ```powershell
  npm run bookings:dev
  npm run irctcSearch:dev
  npm run my-react-app:dev
  ```

Notes and caveats:
- This merged `package.json` does not change the individual projects. Each script changes directory into the project and runs the original command.
- If you prefer a workspace/monorepo setup, consider converting this repo to a Yarn/PNPM workspace and keeping per-project package.json files.
- Semantic version resolution was done conservatively (prefer the numerically newer version). If a particular project requires an older version, you may need to adjust the merged versions.

If you'd like, I can:
- Create an npm workspace configuration to manage all three projects in one repo.
- Run `npm install` and verify the install completes.
