# shadcn/ui monorepo template

This is a Vite monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Troubleshooting

### Rollup native binary error on macOS (Team ID mismatch)

If you see `code signature not valid for use in process` / `different Team IDs` when running `pnpm dev`, the issue is that the wrong Node.js binary is being used. This happens when a Node.js binary with Hardened Runtime (e.g. bundled with an app like Codex) tries to load the rollup native module.

**Fix: ensure you are using the nix-managed Node.js.**

- **Terminal**: run from bash, or ensure your zsh sources the nix profile (`/etc/static/zshrc`)
- **IntelliJ**: go to **Settings → Languages & Frameworks → Node.js** and set the interpreter to `/etc/profiles/per-user/<username>/bin/node`

The correct node is v24.13.0 (ad-hoc signed, no Team ID restrictions).

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
