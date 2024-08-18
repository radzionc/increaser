#!/bin/bash

# Define the paths
INCREASER_LIB=~/increaser/increaser/lib
RADZIONKIT_LIB=~/radzionkit/lib

# Perform a dry-run to identify extra directories in radzionkit that are not in increaser
EXTRA_DIRS=$(rsync -avn --delete "$INCREASER_LIB/" "$RADZIONKIT_LIB/" | grep 'deleting' | awk '{print $2}')

# Sync the increaser's lib with radzionkit's lib, ensuring all files in increaser are present in radzionkit
rsync -av "$INCREASER_LIB/" "$RADZIONKIT_LIB/"

# Restore extra directories that should not be deleted
for DIR in $EXTRA_DIRS; do
  if [[ -d "$RADZIONKIT_LIB/$DIR" ]]; then
    mkdir -p "$RADZIONKIT_LIB/$DIR"
  fi
done

# Print a completion message
echo "Sync complete: $RADZIONKIT_LIB has been updated with packages from $INCREASER_LIB"
