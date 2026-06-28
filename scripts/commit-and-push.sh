#!/bin/bash

git config --global user.name "github-actions[bot]"
git config --global user.email "github-actions[bot]@users.noreply.github.com"

git add .

git commit -m "chore: update static asset from issue #$ISSUE_NUMBER"

MAX_SLEEP=10

echo "Starting Git sync loop..."

while true; do
    echo "Attempting to pull and push..."
    
    # Execute pull with rebase, and if successful, execute push
    if git pull --rebase && git push; then
        echo "Success: Git repository is up to date and pushed!"
        break
    else
        SLEEP_TIME=$(( RANDOM % MAX_SLEEP + 1 ))
        
        echo "Command failed. Retrying in $SLEEP_TIME seconds..."
        sleep "$SLEEP_TIME"
    fi
done
