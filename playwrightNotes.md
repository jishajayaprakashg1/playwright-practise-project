# Playwright
* Playwright is an open-source, cross-browser end-to-end testing and web automation framework,
  developed by Microsoft and launched in January 2020. 
### Why playwright?
  - open source
  - supports multiple languages: .net, java, python, javascript, typescript
  - cross platform support: windows, mac, linux
  - multiple browser support: chromium, webkit, firefox
  - can run from local or CI in headless or headed mode

### Top features
  - auto wait and retry
  - inbuilt codegen tool
  - reporting using traceviewer, powerful debugging using playwright inspector
  - parallel execution using multiple users, from muliple origin, on multiple tabs
  - isolated browser context

### Architectire and difference with Selenium
- Selenium architecture: works on HTTP protocol. Client code is converted to json and sent to the browser driver which in turn sends it to the browser.

- Playwright architecture: Works on websocket protocol. Once the test is triggered the code is directly executed on the browser.

- Difference between HTTP and websocket connection: Selenium sends each command (opening a browser, clicking on command etc) as a separate HTTP request and receives json responses. After every request the connection is terminated between server and client, which results in slowness and hence flakiness. In playwright: all requests are sent as part of a single websocket connection until the test execution is completed.
 
### Pre-requisites
 - Node.js is required:  playwright is an npm module, i.e; playwright is written in typescript and packaged as an npm module so we need
 Download nvm from official website: https://www.nvmnode.com/
  ```
  Run the .exe file as admin
  In terminal type : nvm install lts
  nvm use lts
  Check if it is installed correctly:
  nvm -v
  node -v
  npm -v
  ```

  - Download VS code from official website: https://code.visualstudio.com/download?_exp_download=fb315fc982
 ```
 Install the set up .exe
 Extensions on vscode: 
 a. Code Runner
 b. Playwright Test for VSCode
 ```
 - Download GIT from official website: https://gitforwindows.org/

### Install playwright
Open VSCode, create and open a folder in it. Install playwright in it.

latest version: https://playwright.dev/docs/release-notes

Install with command
```
npm init playwright@latest
```
OR

Another way to install playwright: via VSCode plugin
```
create an empty folder in the system.
Open that project in VScode. Go to extensions section, search for : Playwright Test for VSCode and install the plug in
Go to View--> command Palatte --> when it opens type the command: >Test: install playwright Select the browser, uncheck Javascript and GITHIB actions workflow
``` 

- Questions to answer during the installation?
```
TypeScript or JavaScript (default: TypeScript)
Tests folder name (default: tests, or e2e if tests already exists)
Add a GitHub Actions workflow (recommended for CI)
Install Playwright browsers (default: yes)
```

### how to check which version of playwright is installed?
```
npx playwright --version
```

### What is installed?
```
playwright.config.ts         # Test framework configuration, controls how your automated tests run.
package.json                 # project dependencies are defined here, tells npm what versions are acceptable, it stores other configs and scripts information
package-lock.json            # Or yarn.lock / pnpm-lock.yaml, locks the dependency version.  tells npm exactly which dependency versions to install.
node_modules                 # downloads the project dependencies
tests/
  example.spec.ts            # Minimal example test
```

### How to run a test and generate the html report
```
npx playwright test // it will go to the playwright.config.ts, from testDir it understands that the test file example.spec.ts is present, testcases inside it will b eexecuted and report will be generated

npx playwright show-report // view th ehtml report using this command
```

### What are the extensions to install?
```
1. Playwright Test For VS Code : this is official extension : a triangle symbol will appear on the left side, you can click to run it the test
2. Playwright runner by Koushik : this is third-party extension : a triangle symbol will appear on top of a test with heading: Execute Playwright Test: This will show the command that is executed with test file name and line number
3. Playwright Snippets by Nitay Neeman : this is third-party extension : type pw- and commands will be auto generated.
4. Playwright Test Snippets by Mark Skelton : this is third-party extension
```

### Explain playwright.config.ts
```
import { defineConfig, devices } from '@playwright/test'; // imports configuration helper and predefined browser setting from playwrights's test package

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
```

### Playwright Test (instead of JEST and MOCHA): 
- is the native testing framework, it handles the browser installation and management automatically, eliminating the need for a manual configuration.
- Parallel test execution : can run tests concurrently.
- Retries and timeouts : failed tests will be retried automatically. Test will be run in a specific time frame, instead of running indefinitely.
- Built in assertions.

### Explain the test
```
import {test, expect} from '@playwright/test';  //test : is an playwright Test API object used to write testcases, expect is a playwright API function used for assertions

test.describe("login scenario", () => { //creates a group of related testcases called test suite with name login scenario
    test("TC1: Login with valid credentials", async ({ page }) => { // asynchronous operations tp be performed
        //open this url
        await page.goto('https://practice.sdetunicorns.com/'); //await will wait till this statement is executed, if await was not added then the promise: goto is not reseolved, the test might run and assertion might also pass but it might not have waited till th epage was loaded successfully and the test might fail
        
        //verify the title of the page
        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");  //The page fixture represents a browser tab or page.
    })
});
```

### Different ways to run the tests: from terminal
- Run the tests in headless mode in all three browsers one after the other: npx playwright test
- Run the tests in headless mode in all three browsers parallely: npx playwright test --workers 3
- How to run a one spec file: npx playwright test relative-path-of-the-specFile npx playwright test ./tests/firstTest.spec.ts
- How to run two spec file in one shot: npx playwright test file1 file2 npx playwright test firstTest.spec secondTest.spec OR npx playwright test firstTest secondTest
- To run using the test file name: npx playwright test -g 'This is first Scenario'
- To run only in desired browser: npx playwright test --project=chromium
- To run in headed mode without changing the playwright config: npx playwright test --headed
- To run in the debug mode: npx playwright test --debug
- To run only one testcase in a file after test mehod use only : test.only

### locators
_To interact with web application we need to interact with individual elements. To locate these elements we need locators._

_Locators in playwright are lazily iniitlaised:_
```
//element is queried and identified from the HTML DOM when it comes accross the click() function in this case
await page.locator('#get-started').click(); 
```

### playwright locator strategies:
https://the-internet.herokuapp.com/

- 1. getByRole() : use it for interactive componenets (buttons, links, textboxes)
is widely used to locate by implicit and explicit accessibility attributes, When locating by role, you should pass the accessible name as well, so that the locator pinpoints the exact element.
```
Hierarchy1: aria-labelled : 
<div id="first-name">Itinéraire </div>
<input type="text" aria-labelledBy="first-name"/>
page.getByRole("textbox", {"name":"Itinéraire"})

Hierarchy2: aria-label: 
<input type="button" aria-label="directions">Itinéraire</button>
page.getByRole("button", {"name":"directions"})

Hierarchy3: inner HTML text: 
<a href="/abtest" xpath="1">A/B Testing</a>
page.getByRole("link", {"name":"A/B Testing"})
```

- 2. getByLabel() : to locate form by it's attribute's label
```
<div class="large-6 small-12 columns" xpath="1">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
</div>

page.getByLabel("Username")
```

- 3. getByPlaceholder() : to locate placeholder, for inputs that don't have visible labels
```
 <input type="text" placeholder="usernameplc" id="username">

 page.getbyPlaceholder("usernameplc")
```


- 4. getByText() : to locate by text content, for non-interactive text elements like paragraphs, div texts
```
<a href="/abtest" xpath="1">A/B Testing</a>

page.getByText("A/B Testing")
```

- 5. getByAltText() : to locate image alternatively by it's text
```
<img id="card-logo" src="/img/avatar-blank.jpg" alt="Logo" css="1">

page.getByAltText("Logo")
```

- 6. getByTitle() : to locate by title
```
 <input type="text" title="usernames" id="username">
 
 page.getByTitle("usernames")
```

- 7. getByTestId() : for custom attributes, if there is no unique attribute for an element then provide data-testid to dev who will then insert it into DOM,  this name(data-testid) is configurable
```
playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-testid'
  }
});

<button data-testid="directions">Itinéraire</button>

await page.getByTestId('directions').click();
```

### Advanced locator concepts 
- 1. CSS and XPath for identifying complex locators

- CSS selector
```
 page.locator('#get-started').click();
```

- Text selector 
```
 const heading1 =  page.locator('text=Think different.')
```

- text locator for exact match
```
const heading2 =  page.locator('text="Make different"') 
```

- text and css selector
```
//text and css selector
const heading3 =  page.locator('#primary-menu >> text=Home')
```

- Example: 
<a href="/accessibility_issues">Accessibility Issues</a>
```
CSS: page.locator('a[@href="/accessibility_issues"]')
XPath: 
using href attribute: page.locator("//a[@href='/accessibility_issues']")
using text: page.locator("//a[text()='Accessibility Issues']")
using contains: page.locator("//a[contains(text(), 'Accessibility Issues')]")
using both href attribute and text: page.locator("//a[@href='/accessibility_issues' and text()='Accessibility Issues']")
```

_Note in CSS: exact match: =, contains: *=, starts with: ^=, and ends with: $=_

- 2. List handling : use getByRole to locate all thes list, use filter function to filter the required list with it's text, perform the required action on it.
_filter option: has, hasNot, hasText, hasNotText, visible_

```
Method1: 
const listItems =  page.getByRole("listitem").filter({hasText:"A/B testing"}).getByRole("link")
await listItems.click()

Method2:
const listItems =  page.getByRole("listitem").filter({has:page.getByRole("link")}).getByText("A/B testing")
await listItems.click()
```

- 3. Filtering locators : by text and by child : covered above in Method1 and Method2
- 4. Locator operators : AND OR
```
page.getByRole("link").and(page.getByText("A/B testing"))
```
- 5. Locate Shadow element : it is same as regular locators

## Assertions
- The following assertions will retry until the assertion passes, or the assertion timeout is reached. Note that retrying assertions are async, so you must await them.

There are non-retrying assertions too

- Negating matches
```
await expect.soft(page.locator(#id)).not.toHaveText("GET STARTED")
```

- Soft assertion : if condition fails rest of the test execution continues intead of failing
```
await expect.soft(page.locator(#id)).toHaveText("GET STARTED")
```

- Custom Expect message
await expect(page.getByText('Name'), 'should be logged in').toBeVisible();
```
await expect(page.getByText('Name'), 'should be logged in').toBeVisible();
```
When expect passes, you might see a successful step like this:

✅ should be logged in    @example.spec.ts:18


### Automatic Code generation
Command is :  npx playwright codegen
It opens two windows : chromium and playwright inspector.
What ever actions are performed on the browser will be recorded.
the chromium browser can be changed to another browser.

The code generated by playwright inspector can be pasted into our project test file and it can be executed post review.

The default broser is chromium, to change to a different browser use command:
npx playwright codegen --browser firefox

You can automate the code copying to file by:
npx playwright codegen -o ./tests/codeGenAutoTest.spec.ts

To open the browser in a specific size:  npx playwright codegen --viewport-size=800,600

To open browser in a device: npx playwright codegen --device="iPhone 11 Pro"

All commands is present in : npx playwright codegen --help

### Traceviewer
is a GUI tool, to view the execution details
Playwright waits for 30 seconds before failing  a test. this value can be changed by adding : timeout:5*1000, (which is 5ms=5s), in the playwright.cofig.ts file
to explicitly say how many retries has to be done on failure spcify:  retries:1, in the same config file.
Execute a test such that it fails.
How to open the traceViewer?
1. Open the report. Click on Retires tab, Go to Traces section, click on it.
Top pane is called timeline, left pane is actions and metadata.
Bottom pane shows the locator, errors, network etc.
2. Open the report. Click on Retires tab, Go to Traces section, click on the zip file.
3. Go to the project in VSCode: see the presence of a folder called: test-result, trace.zip will be present. Copy it's relative path:
npx playwright show-trace ./test-results/firstTest-This-is-first-Scenario-chromium-retry1/trace.zip 
4. Opn the url in chrome : trace.playwright.dev
Drag and drop the trace folder.

### trace viewer option
Go to the playwright.config.js file
Ctrl + click on the trace: it will show all the options:
   * - `'off'`: Do not record video.
   * - `'on'`: Record and keep a video for every run.
   * - `'on-first-retry'`: Record and keep a video only for the first retry of a test.
   * - `'on-all-retries'`: Record and keep a video for every retry.
   * - `'retain-on-failure'`: Record a video for every run, but keep it only for runs that failed. A failed run's video is kept even when a later retry passes.
   * - `'retain-on-first-failure'`: Record a video only for the first run of a test (not for retries), and keep it only if that run failed.
   * - `'retain-on-failure-and-retries'`: Record a video for every run, and keep it for any run that failed or that is a retry

   ### how to enable traceviewer from terminal command
   npx playwright test firstTest --trace on

   This is override the value set in playwrigth.config.ts
   ### how to enable traceviewer from tests
   ```
   test('This is to enable trace from test Scenario', async({page, context}) => {
    await context.tracing.start({snapshots: true, screenshots: true});
    await page.goto('https://google.com');

    //assertion on browser page title. Here toHaveTitle is a playwright assertion
    await expect(page).toHaveTitle('Google');

    await context.tracing.stop({path:'tracingSecondTest.zip'});
    });

   ```
### To build a real project
- learning video : https://www.youtube.com/watch?v=bP3M7vCGT4g

- website to automate: https://www.saucedemo.com/ 

_Framework is a way of planning, writing and structuring a project with best practises_

- Tech stack
  * language: javascript
  * IDE: VSCode
  * Test framework and runner: playwright library, playwright test
  * node : as a runtime env for JS




