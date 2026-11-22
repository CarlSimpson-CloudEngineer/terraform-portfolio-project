
# Remote state and locking: S3 only (bucket cs-tfstate-s3 with s3 native lockfile).
terraform {
  backend "s3" {
    bucket       = "cs-tfstate-s3"
    key          = "terraform-portfolio-project/terraform.tfstate"
    region       = "eu-west-2"
    encrypt      = true
    use_lockfile = true
  }
}