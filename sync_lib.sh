#!/bin/bash

# Define the paths
INCREASER_LIB=~/increaser/increaser/lib
RADZIONKIT_LIB=~/radzionkit/lib

# Sync the radzionkit's lib with what is in increaser's lib, without deleting extra packages
rsync -av --ignore-existing "$INCREASER_LIB/" "$RADZIONKIT_LIB/"

# Print a completion message
echo "Sync complete: $RADZIONKIT_LIB has been updated with packages from $INCREASER_LIB"
