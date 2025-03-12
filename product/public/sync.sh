#!/bin/zsh -e

# Required environment variables:
# - BUCKET: S3 bucket name
# - DISTRIBUTION_ID: CloudFront distribution ID

# Ensure the public directory exists
PUBLIC_DIR="public"
if [ ! -d "$PUBLIC_DIR" ]; then
  echo "Public directory $PUBLIC_DIR does not exist."
  exit 1
fi

# Function to sync a directory and invalidate CloudFront cache
sync_and_invalidate() {
  local_dir="$1"
  s3_dir="s3://$BUCKET/${local_dir#$PUBLIC_DIR/}"

  echo "Syncing $local_dir to $s3_dir..."

  # Sync the local directory to the corresponding S3 directory
  aws s3 sync "$local_dir" "$s3_dir" \
    --delete \
    --metadata-directive REPLACE \
    --cache-control max-age=31536000,public \
    --acl public-read

  echo "Creating CloudFront invalidation for /${local_dir#$PUBLIC_DIR/}/*"

  # Invalidate CloudFront cache for the synced directory
  aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/${local_dir#$PUBLIC_DIR/}/*"
}

# Iterate over each directory within the public directory
find "$PUBLIC_DIR" -mindepth 1 -maxdepth 1 -type d | while read -r dir; do
  sync_and_invalidate "$dir"
done

echo "Sync and invalidation complete."
