provider "aws" {
  region = var.aws_region
}

# Private bucket for James's site files. Only CloudFront will be allowed to read it (added later)
resource "aws_s3_bucket" "site" {
  #checkov:skip=CKV_AWS_144:No cross-region replication - content rebuilds from GitHub (decision 3)
  #checkov:skip=CKV_AWS_145:SSE-S3 default encryption - KMS adds cost and key policy for CloudFront
  #checkov:skip=CKV_AWS_18:No access logging - CloudFront is the only reader
  #checkov:skip=CKV2_AWS_62:No event notifications - nothing reacts to uploads
  bucket        = var.site_bucket_name
  force_destroy = true
}

# Lock the bucket down explicitly, so the intent is in code and drift gets caught.
resource "aws_s3_bucket_public_access_block" "Nextjs_bucket_public_access_block" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# keep previosu versions of siite file so a bad deploy can be rollled back 
resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Delete old versions after 30 days so they don't drive up cost
resource "aws_s3_bucket_lifecycle_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    id     = "expire-old-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 30
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }

  depends_on = [aws_s3_bucket_versioning.site]
}

# Adding CloudFront's identity for reading private bucket 
resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "nextjs-site-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Global CDN in front of the private bucket: HTTPS for visitors, files cached at edge locations.
resource "aws_cloudfront_distribution" "site" {
  #checkov:skip=CKV_AWS_310:No origin failover - site rebuilds from code (decision 3)
  #checkov:skip=CKV_AWS_68:No WAF - nothing to protect, cost exceeds budget (checklist 5)
  #checkov:skip=CKV2_AWS_47:No WAF and no Java backend (Log4j rule)
  #checkov:skip=CKV_AWS_174:Default cloudfront.net cert forces TLSv1 - needs custom domain
  #checkov:skip=CKV2_AWS_42:No custom domain in v1
  #checkov:skip=CKV_AWS_374:Global audience - no geo restriction
  #checkov:skip=CKV2_AWS_32:False positive - managed SecurityHeadersPolicy attached by ID (decision 11)
  #checkov:skip=CKV_AWS_86:No access logging - extra bucket and cost, no one reviewing logs
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-site"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id           = "s3-site"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6" # AWS managed: CachingOptimized
    response_headers_policy_id = "67f7725c-6f97-4210-82d7-5512b31e9d03" # AWS managed: SecurityHeadersPolicy
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Only this CloudFront distribution may read the site files. Nobody else.
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontReadOnly"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.site.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
        }
      }
    }]
  })
}
output "cloudfront_url" {
  value = "https://${aws_cloudfront_distribution.site.domain_name}"
}

# Cost guardrail: emails before spend becomes a surprise

resource "aws_budgets_budget" "monthly" {
  name         = "terraform-portfolio-monthly"
  budget_type  = "COST"
  limit_amount = var.monthly_budget_usd
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.alert_email]
  }
}