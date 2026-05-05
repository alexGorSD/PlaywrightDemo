# PlaywrightDemo

## Technologies used:
* Language: Typescript
* Page Object Model
* Fixtures + Base page
* Gherkin
* Tags
* CI/CD GitHub Actions


## Demo website:
https://www.saucedemo.com/
  
## General Setup
* Install [Git](https://git-scm.com/downloads)
* Install [VS Code](https://code.visualstudio.com/)
* Install [Node](https://nodejs.org/en)
* in VSCode, install an extension `Playwright Test for VSCode`

Verify they are all installed by running commands:
- `git -v`
- `node -v`
- `npm -v`

## Playwright Installation
* Clone repository 
* run `npm init playwright@latest`
* run `npm install typescript`

To run the project:
* `npx playwright test` (whole suite)
* `npx playwright test --grep @smoke` (smoke test cases only)

To run the project in GitHub Actions:

1. Navigate to 'Actions' tab
2. Click 'Playwright Tests Demo' on left side
3. Click 'Run workflow'
4. Select Regression or Smoke test suite


## Playwright documentation
* https://playwright.dev/
