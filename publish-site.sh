#!/usr/bin/env bash
set -euo pipefail

site_dir="$(cd -- "$(dirname -- "$0")" && pwd -P)"
git_dir="$site_dir/.pages-publish.git"
expected_remote="https://github.com/ownway22/workshop-agentic-factory-pages.git"

if [[ ! -d "$git_dir" ]]; then
  echo "找不到本機發布用 Git 資料。若是直接 clone 網站 repository，請使用一般 Git 流程。"
  exit 1
fi

site_git() {
  git --no-pager --git-dir="$git_dir" --work-tree="$site_dir" "$@"
}

if [[ "$(site_git remote get-url origin)" != "$expected_remote" ]]; then
  echo "發布來源不是預期的網站 repository，已停止。"
  exit 1
fi
if [[ "$(site_git symbolic-ref --quiet HEAD)" != "refs/heads/main" ]]; then
  echo "發布分支不是 main，已停止。"
  exit 1
fi

site_git fetch origin main
if ! site_git merge-base --is-ancestor FETCH_HEAD HEAD; then
  echo "遠端有本機尚未包含的變更；請先處理遠端變更，避免覆蓋。"
  exit 1
fi

index_file="$(mktemp "$git_dir/publish-index.XXXXXX")"
rm -f -- "$index_file"
trap 'rm -f -- "$index_file"' EXIT
export GIT_INDEX_FILE="$index_file"
site_git read-tree HEAD
site_git add -A -- \
  .github/workflows/pages.yml .gitignore README.md docs mkdocs.yml \
  publish-site.sh requirements-docs.in requirements-docs.lock
site_git diff --cached --check

if site_git diff --cached --quiet && [[ "$(site_git rev-parse HEAD)" == "$(site_git rev-parse FETCH_HEAD)" ]]; then
  echo "網站沒有需要發布的變更。"
  exit 0
fi

echo "以下內容將推送至公開網站 repository："
site_git diff --cached --stat
site_git log --oneline FETCH_HEAD..HEAD
echo "請確認檔案與截圖不含密碼、金鑰或其他不應公開的資料。"
read -r -p "確定發布？請輸入 yes： " answer
if [[ "$answer" != "yes" ]]; then
  echo "已取消發布。"
  exit 1
fi

if ! site_git diff --cached --quiet; then
  site_git commit -m "Update workshop documentation"
fi
site_git push origin HEAD:main
echo "已推送。請至 GitHub Actions 確認網站發布完成。"
