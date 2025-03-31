#!/bin/bash

# Exit immediately if a command fails
set -e

# Switch to the main branch
git checkout main

# Merge the dev branch into main
git merge dev

# Push changes to GitHub
git push origin main

echo "✅ Successfully merged 'dev' into 'main' and pushed to GitHub!"
