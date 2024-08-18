#!/bin/bash

# Define the paths
INCREASER_LIB=~/increaser/increaser/lib
RADZIONKIT_LIB=~/radzionkit/lib

# Find all root-level directories in radzionkit's lib that are not in increaser's lib
EXCLUDE_DIRS=()
for dir in "$RADZIONKIT_LIB"/*; do
  if [[ -d "$dir" ]]; then
    basename=$(basename "$dir")
    if [[ ! -d "$INCREASER_LIB/$basename" ]]; then
      EXCLUDE_DIRS+=("--exclude=$basename/")
    fi
  fi
done

# Sync with deletion, but exclude root-level directories in radzionkit's lib that do not exist in increaser's lib
rsync -av --delete "${EXCLUDE_DIRS[@]}" "$INCREASER_LIB/" "$RADZIONKIT_LIB/"

# Print a completion message
echo "Sync complete: $RADZIONKIT_LIB has been synchronized with $INCREASER_LIB, with extra root directories preserved."
