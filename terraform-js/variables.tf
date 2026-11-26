
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
  description = "GitHub owner/repo allowed to deploy"
  type        = string
  default     = "CarlSimpson-CloudEngineer/terraform-portfolio-project"
}