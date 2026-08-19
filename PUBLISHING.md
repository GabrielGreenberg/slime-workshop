# Publishing the SLIME site

The site lives at https://github.com/GabrielGreenberg/slime-workshop (branch `main`)
and is published via GitHub Pages at https://slime-workshop.com (CNAME file in repo root).
**Pushing to `main` publishes the site** — Pages redeploys automatically (~1 min).

## Publishing from a Claude/Cowork session

In the sandbox this folder is mounted at `/sessions/<session>/mnt/SLIME`. Steps:

```bash
cd <mounted SLIME folder>
git add <changed files>        # avoid `git add -A`; see notes below
git commit -m "message"
git push origin main
```

Notes for Claude:

- **Credentials: already set up (Aug 2026).** A fine-grained PAT (Contents:
  read/write on `slime-workshop`) is embedded in the `origin` remote URL in
  `.git/config`, so plain `git push origin main` works from the sandbox — no
  keychain, no prompts. If it ever fails with 403/401, the token was revoked or
  expired: ask Gabriel for a new one (github.com/settings/personal-access-tokens →
  fine-grained, Repository access: Only select repositories → slime-workshop,
  Repository permissions → Contents: Read and write), then run
  `git remote set-url origin https://GabrielGreenberg:<TOKEN>@github.com/GabrielGreenberg/slime-workshop.git`
- **Stale lock files:** the sandbox sometimes cannot unlink `.git/*.lock` files
  ("Operation not permitted" warnings during commit). The commit still succeeds,
  but afterwards remove stale locks or later git commands fail: request file-delete
  permission (`allow_cowork_file_delete`), then
  `rm -f .git/HEAD.lock .git/index.lock .git/objects/maintenance.lock`
  and `find .git -name "tmp_obj_*" -delete`.
- **Don't commit junk:** working files like `assets/images/Untitled 2.key` may sit
  untracked in the folder — stage files explicitly rather than `git add -A`.

## Publishing from the Mac (Terminal)

```bash
cd ~/Documents/Website/SLIME
git add <changed files> && git commit -m "message" && git push
```

Credentials are already set up there (keychain).
