# Serverless Full Boilerplate

This is a CLI tool to create Serverless boilerplate applications. Ready to deploy in a few seconds.

# Usage

`npx create-full-sls-app`

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
- Example API endpoint (with [middy](https://www.npmjs.com/package/middy) package)
- A regional setup and default region is `eu-central`
- Multi-Region support (adding `us-east1`) (optional)

# Development

```
yarn build
yarn start
```

# TODO

- Improve documentation

Author: [Emin Bugra Saral](https://www.saral.dev)
