# Serverless Full Boilerplate

This is a CLI tool to create Serverless boilerplate applications. Ready to deploy in a few seconds.

# Usage

```
npm i -g create-full-sls-app
create-full-sls-app
```

or

```
npx create-full-sls-app
```

Answer the questions. It will create a directory of with the name you gave for your project.

`cd your-project-name`

```
yarn
yarn domain:create:dev
yarn deploy:dev
```

or run in your local:

`yarn start:local`

# What's included?

- [Gitlab](https://www.gitlab.com) CI/CD setup
- or [GitHub](https://www.github.com) Actions setup (not fully complete)
- [SonarCloud](https://www.sonarcloud.io) setup (optional)
- [DataDog](https://www.datadoghq.com/) setup (optional)
- [Sentry](https://www.sentry.io) setup
- [Yup](https://www.npmjs.com/package/yup) validation integration
- [Husky](https://github.com/typicode/husky) setup in place for pre-commit and pre-push
- [TypeScript](https://www.typescriptlang.org/), [Webpack](https://webpack.js.org/) 5, [serverless.yml](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml) setups
- [Example API endpoint](https://github.com/ebsaral/create-full-sls-app/blob/1.4.0/templates/serverless-full-sls-app/src/handlers/status/index.ts) (with [middy](https://www.npmjs.com/package/middy) package and additional middlewares)
- A regional setup and default region is `eu-central`
- Multi-Region support (adding `us-east1`) (optional)

# Command List

| name                   | type          | default                 | description                                                  |
| ---------------------- | ------------- | ----------------------- | ------------------------------------------------------------ |
| template               | choices       | serverless-full-sls-app |                                                              |
| name                   | strict-string | required                | Project name (e.g dummy-service)                             |
| organization           | strict-string | required                | Organization name (e.g finn-auto)                            |
| gitSetup               | choices       | GitLab                  | Options: GitLab, GitHub                                      |
| mainBranch             | choices       | main                    | Options: main, master                                        |
| enableSonarCloud       | bool          | Y                       | Setup SonarCloud (Y/n)                                       |
| enableMultiRegion      | bool          | Y                       | Add us-east-1 and enable multi-region (Y/n)                  |
| enableDataDog          | bool          | Y                       | Enable DataDog in the setup (Y/n)                            |
| dataDogArnEuCentral    | string        | empty                   | DataDog EU ARN (only if DataDog is enabled)                  |
| dataDogArnUsEast       | string        | empty                   | DataDog US ARN (only if DataDog and multi-region is enabled) |
| memorySize             | number        | 256                     | Memory Size of Lambda in MB                                  |
| timeout                | number        | 10                      | Timeout of API endpoints in seconds                          |
| minimumCompressionSize | number        | 1024                    | Minimum Compression Size of API Gateway in MB                |
| maxRequestsPerSecond   | number        | 100                     | API Gateway Throttling Maximum Requests Per Second setting   |
| maxConcurrentRequests  | number        | 50                      | API Gateway Throttling Maximum Concurrent Requests setting   |
| developmentUrl         | string        | dev-service.domain.com  | Development service URL                                      |
| productionUrl          | string        | service.domain.com      | Production service URL                                       |

Example:

```
npx create-full-sls-app --template=serverless-full-sls-app --name=dummy-name --organization=dummy-org --gitSetup=GitLab --mainBranch=main --enableSonarCloud --enableMultiRegion --enableDataDog --dataDogArnEuCentral=dummyArn --dataDogArnUsEast=dummyArn --memorySize=1024 --timeout=20 --minimumCompressionSize=1024 --maxRequestsPerSecond=200 --maxConcurrentRequests=50 --developmentUrl=dev-service.domain.com --productionUrl=service.domain.com
```

# Development

```
yarn build
yarn start
```

# Contribution

Feel free to create a PR to add a new feature or update the current tool. :)

---

Author: [Emin Bugra Saral](https://www.saral.dev) <3
