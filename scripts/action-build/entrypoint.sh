#!/bin/sh

git config user.name github-bot
git config user.email bot@github.com
git add .
git commit -m 'build'
git push "https://${GITHUB_TOKEN}@github.com/naoyayamamoto/angular-snippets.git"
