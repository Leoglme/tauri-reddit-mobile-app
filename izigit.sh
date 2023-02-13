#!/bin/bash
#Install github cli instruction if not exit on your machine
command -v gh >/dev/null 2>&1 || {
  echo >&2 "please install github cli and run command gh auth login: https://cli.github.com/manual/installation"
  exit 1
}

# Global variable

# Retrieving the current date
date=$(date +"%d/%m/%Y %T")

# Get Your github Username
github_name=$(gh api user -q .name)

# Help command

# Fonction for display help
Help() {
  echo "#####################################################################################################"
  echo "#"
  echo "#                                    IZIGIT.SH"
  echo "#"
  echo "# This script allows izidor developers to automate and manage git workflow easily."
  echo "#"
  echo "#####################################################################################################"
  echo ""
  echo
  echo "Syntax: izigit [-s|c|i|p|h]"
  echo "options:"
  echo ""
  echo "create [ticket_number] Create, fetch and checkout branch for ticket ( example: izigit create 654 )"
  echo "reset Reset test branch, so that it is strictly identical to the preprod branch ( example: izigit reset )"
  echo "test [ticket_number] Merge issue branch into test branch ( example: izigit test 654 )"
  echo "pr [ticket_number] Creating a pull request from the github issue branch to the preprod branch ( example: izigit pr 654 )"
  echo "h     Print this Help."
}

# Creating a pull request from the github issue branch to the preprod branch
# Arguments: $2 = ticket number
PrIssueToPreprod() {
  if [ $2 ]; then
    preprod_branch=preprod
    # Get branch name with ticket number
    issue_branch_name=$(git branch -r | grep $2 | sed 's/origin\///')

    if [ -z $issue_branch_name ]; then
      echo "No git branch found for ticket $2"
      exit 0
    fi

    # Updates the issue branch, relative to the preprod branch
    git checkout $issue_branch_name
    git pull origin $issue_branch_name
    git merge $preprod_branch
    git push origin $issue_branch_name

    # Check if there are any conflicts
    #disable lf and crlf warnings
    git config core.autocrlf false
    if git diff --name-only --diff-filter=U | grep -q "^"; then
      echo "There are merge conflicts to resolve :"
      git diff --name-only --diff-filter=U
      exit 0
    fi

    # Get issue title
    pr_title=$(gh issue view $2 --json title --jq .title)
    # remove special characters from pr_title
    pr_title=${pr_title//[^a-zA-Z0-9 ]/}

    # Create a pull request from the issue branch to the target branch (preprod)
    gh pr create --base preprod --head $issue_branch_name -t "$2 $pr_title" -b ""

    # Add comment to issue
    comment="$date - create pull request branch $issue_branch_name to $preprod_branch - $github_name"
    gh issue comment $2 -b "$comment"
    echo $comment
    exit 0
  fi
  echo "Please specify allows ticket number, izigit pr [ticket_number] ( example: izigit pr 654 )"
}

# Fonction for merge issue branch into test branch
# Arguments: $2 = ticket number
MergeIssueInTest() {
  if [ $2 ]; then
    test_branch=test
    # Get branch name with ticket number
    branch_name=$(git branch -r | grep $2 | sed 's/origin\///')

    if [ -z $branch_name ]; then
      echo "No git branch found for ticket $2"
      exit 0
    fi

    git checkout $test_branch
    git pull origin $test_branch
    git merge $branch_name
    git push origin $test_branch

    # Add comment to issue
    comment="$date - merge branch $branch_name into $test_branch - $github_name"
    gh issue comment $2 -b "$comment"
    echo $comment
    exit 0
  fi
  echo "Please specify allows ticket number, izigit test [ticket_number] ( example: izigit test 654 )"
}

# Fonction for reset test branch, so that it is strictly identical to the preprod branch
ResetTestToPreprod() {
  test_branch="test"
  reference_branch="preprod"

  # Fetch and checkout the reference branch (preprod)
  git fetch
  git checkout $reference_branch
  git pull $reference_branch

  # Delete the local working branch
  git branch -D $test_branch

  # Create a new branch from the reference branch (preprod)
  git checkout -b $test_branch

  # Push the new branch to the remote repository
  git push -u origin $test_branch --force

  comment="$date - $test_branch reset to $reference_branch - $github_name"
  echo $comment
}

# Fonction for create branch for ticket and fetch, checkout this branch
# Arguments: $2 = ticket number
CreateBranch() {
  if [ "$2" ]; then
    # Get Your github Username
    github_username=$(gh api user -q .login)
    # Assign user to issue
    gh issue edit "$2" --add-assignee "$github_username"
    # Get the title of the issue using the gh command
    issue_title=$(gh issue view $2 --json title --jq .title)
    # remove special characters from issue_title
    issue_title=${issue_title//[^a-zA-Z0-9 ]/}
    # replace multiple spaces with single space and trim title
    issue_title="$(echo -e "${issue_title}" | tr -s ' ' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
    # Replace spaces with dashes and concatenate the issue number to the branch name to avoid filename issues
    branch_name=$2-${issue_title// /-}
    # Create the issue branch and link the branch to the GitHub issue
    gh issue develop $2 --name $branch_name --base $branch_name

    git fetch origin
    # Checkout to the created branch
    git checkout $branch_name

    comment="$date - creation of the $branch_name branch and branch link to issue $2 - $github_name"

    # Add comment to issue
    gh issue comment $2 -b "$comment"

    echo $comment
    exit 0
  fi
  echo "Please specify allows ticket number, izigit create [ticket_number] ( example: izigit create 654 )"
}

# Enable options arguments
while getopts "h" option; do
  case $option in
  h)
    Help
    exit
    ;;
  ?)
    printf "Command not found, please use command -h for display help"
    exit 1
    ;;
  esac
done

# Display message if no argument or option supplied
if [ $OPTIND -eq 1 ] && [ $# -eq 0 ]; then echo "An argument is required, please use command -h for display help"; fi

# Enable options
if [ "$1" == "create" ]; then CreateBranch $1 $2; fi
if [ "$1" == "reset" ]; then ResetTestToPreprod; fi
if [ "$1" == "test" ]; then MergeIssueInTest $1 $2; fi
if [ "$1" == "pr" ]; then PrIssueToPreprod $1 $2; fi
