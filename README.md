# faker-ts

Mock data from TypeScript

## Usage

``` ts
import { tsMock, tsMockService } from 'faker-ts';

const files = ['foo.ts'];
// foo.ts
// export interface IFoo { a: string }

const mocker = tsMock(files);
mocker.generateMock('IFoo'); // { "a": "commodo voluptate pariatur" }

// or listening file change
const mocker = tsMockService(files); // see more Mock Server with Koa
```

### CLI

``` shell
yarn global add faker-ts
```

e.g.

``` shell
echo "interface IFoo { title: string; }" > foo.ts
faker-ts foo.ts IFoo # Mock data
```

### Mock Server with Koa

``` ts
import Koa from 'koa';
import Router from 'koa-router';
import * as ts from 'typescript';
import { tsMockService } from 'faker-ts';

export function createServer(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const app = new Koa();
  const router = new Router();

  const mocker = tsMockService(files, jsonCompilerOptions, basePath);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.body = { msg: error.message };
    }
  });

  router.get('/mocks/:symbol', async (ctx) => {
    ctx.body = mocker.generateMock(ctx.params.symbol);
  });

  router.get('/schemas/:symbol', async (ctx) => {
    ctx.body = mocker.generateSchema(ctx.params.symbol);
  });

  router.get('/schemas', async (ctx) => {
    ctx.body = mocker.generateSchema();
  });

  router.get('/symbols', async (ctx) => {
    ctx.body = mocker.generator.getMainFileSymbols(mocker.program);
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
}
```
