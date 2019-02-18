# How to Contribute

Thanks for your interest in improving react-datepicker!

This repo uses yarn workspaces, so you should install yarn@1.3.2 or higher as a package manager.

* The development environment is Node 9+.
* Unit tests run with jest
* Code has 100% test coverage and it should stay so (yarn test --coverage to check it)
* Code must be linted to pass our CI (yarn lint)

## Coding Convention

* We use prettier for code styling. Don't worry about tabs vs spaces, or how to indent your code.
* We use ESlint for all other coding standards. We try to be consistent and helpful.

## Commit Message Guide 
We are following [Karama Commit Message Guide](http://karma-runner.github.io/3.0/dev/git-commit-msg.html)
* feat (new feature for the user, not a new feature for build script)
* fix (bug fix for the user, not a fix to a build script)
* docs (changes to the documentation)
* style (formatting, missing semi colons, etc; no production code change)
* refactor (refactoring production code, eg. renaming a variable)
* test (adding missing tests, refactoring tests; no production code change)
* chore (updating grunt tasks etc; no production code change)

## Start now!

Pick an issue you would like to fix or a feature you would like to see. good-first-issues are a good place to start.


## Fork this project
```
# clone your fork repository 
git clone https://github.com/y0c/react-datepicker
# install dependency
yarn 
# run storybook local 
yarn run storybook 
```
Then open http://localhost:6006

## Create Topic Branch
```
# branch naming is (feature/fix)/iss-{issue_nubmer}-{feature_name}
git checkout -b feature/iss-01-feature-name
# if you develop complete? 
# commit & pull request 
```
if your PR pass code review then merge to master branch

