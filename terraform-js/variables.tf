
variable "aws_region" {
  description = "AWS region for the site bucket"
  type        = string
  default     = "eu-west-2"
}

variable "site_bucket_name" {
  description = "Globally unique name for private site bucket"
  type        = string
  default     = "nextjs-site-s3"
}

variable "alert_email" {
  description = "Email for budget alerts. Set in TFvars, never committed"
  type        = string
  sensitive   = true
}

variable "monthly_budget_usd" {
  description = " Monthly cost budget in usd"
  type        = string
  default     = "5"
}

variable "github_repo" {
  description = "GitHub owner@id/repo@id allowed to deploy (immutable OIDC sub format)"
  type        = string
  default     = "CarlSimpson-CloudEngineer@352863257/aws-static-site-terraform@1466644042"
}variable "x" {type=string}
