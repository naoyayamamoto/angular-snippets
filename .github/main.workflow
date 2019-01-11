workflow "Build and deploy on push" {
  on = "push"
  resolves = ["./scripts/action-build"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@b2bea0749eed6beb495a8fa194c071847af60ea1"
  args = "branch master"
}

action "./scripts/action-build" {
  uses = "./scripts/action-build"
  needs = ["Filters for GitHub Actions"]
  secrets = ["GITHUB_TOKEN"]
}
