provider "aws" {
  region = "eu-west-2"
}

# Private bucket for James's site files. Only CloudFront will be allowed to read it (added later)
resource "aws_s3_bucket" "site" {
  bucket = "nextjs-site-s3"
}

# Lock the bucket down explicitly, so the intent is in code and drift gets caught.
resource "aws_s3_bucket_public_access_block" "Nextjs_bucket_public_access_block" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}