
variable "aws_region" {
  description = "AWS region for the site bucket"
  type        = string
  default     = "eu-west-2"
}

variable "site_bucket_name" {
  description = "Gloabally unique name for private site bucket"
  type        = string
  default     = "nextjs-site-s3"
}