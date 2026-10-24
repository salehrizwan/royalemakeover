# Contributing & Deployment Guide — Royale Makeover

This repository powers the official website for **Royale Makeover** (Nekapura, Sialkot, Punjab, Pakistan).

## Environment Requirements

- **Node.js**: `>= 20.0.0` (Recommended: `22.x` as pinned in `.nvmrc`)
- **npm**: `>= 10.0.0`
- **Package Manager**: Exclusively `npm`. Do not use Bun, Yarn, or pnpm lockfiles (`bun.lock`, `yarn.lock`, `pnpm-lock.yaml`) in this repository.

## Dependency Maintenance Safeguards

To prevent deployment breaks and `npm ci` sync failures (such as missing multi-platform binaries for `@tailwindcss/oxide`, `lightningcss`, `@rolldown/binding`, and `@typescript/typescript-*`):

1. **Always use npm ci for installs in CI/CD and deployment environments**:
   ```bash
   npm ci
   ```
2. **When modifying dependencies in `package.json`**:
   - Run `npm install` on a clean state to let npm update `package-lock.json` with all optional platform dependencies.
   - Verify lockfile synchronization before committing:
     ```bash
     npm ci
     npm run lint
     npm run build
     ```
   - Always commit both `package.json` and `package-lock.json` together in the same commit.
3. **Never delete `package-lock.json` without re-generating and committing it**:
   - `package-lock.json` is required by Vercel and GitHub Actions.
   - Do not pass `--force` or `--legacy-peer-deps`.
4. **Avoid package manager collisions**:
   - Never commit `bun.lock` or set invalid config flags like `cache-dir` in npm configurations.

## Build and Validation Commands

```bash
# Clean install exactly from lockfile
npm ci

# Typecheck and lint codebase
npm run lint

# Compile production bundle
npm run build

# Run local preview
npm run preview
```
