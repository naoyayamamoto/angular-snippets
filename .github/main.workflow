workflow "Build and deploy on push" {
  on = "push"
  resolves = ["Filters for GitHub Actions"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

workflow "New workflow 1" {
  on = "push"
}
