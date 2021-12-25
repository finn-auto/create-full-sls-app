# <%= projectName %>

This is a template project written in TypeScript, ready to be deployed to [Serverless](https://www.serverless.com) with basic CI/CD setup and additional packages in place.


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


# Development

```
yarn
yarn start:local
```
