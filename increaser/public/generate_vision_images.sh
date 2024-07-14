#!/bin/bash

# Define source and destination directories
SOURCE_DIR="./vision"
DEST_DIR="./public/vision"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Loop through all images in the source directory
for IMAGE in "$SOURCE_DIR"/*; do
    # Get the filename without the extension
    FILENAME=$(basename "$IMAGE")
    BASENAME="${FILENAME%.*}"
    
    # Define the destination path
    DEST_PATH="$DEST_DIR/$BASENAME.webp"
    
    # Convert and resize the image to WebP format with a width of 1080
    cwebp -resize 1080 0 "$IMAGE" -o "$DEST_PATH"
    
    echo "Converted $IMAGE to $DEST_PATH"
done

echo "All images have been converted and saved to $DEST_DIR"
