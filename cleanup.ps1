# PowerShell cleanup script
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item bun.lock -ErrorAction SilentlyContinue