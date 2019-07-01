import Koa from 'koa';
import Router from 'koa-router';
import * as ts from 'typescript';
import { fakerGenerate } from './faker';
import { tsSchemaWatcher } from './tsSchema';

export function createServer(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const app = new Koa();
  const router = new Router();

  const originGetGenerator = tsSchemaWatcher(files, jsonCompilerOptions, basePath);
  const getGenerator = () => {
    const generator = originGetGenerator();
    if (!generator) {
      throw new Error('mockGenerator is null');
    }
    return generator;
  };

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.body = { msg: error.message };
    }
  });

  router.get('/apis/:symbol', async (ctx) => {
    const schema = getGenerator().getSchemaForSymbol(ctx.params.symbol);
    ctx.body = fakerGenerate(schema);
  });

  router.get('/schemas/:symbol', async (ctx) => {
    ctx.body = getGenerator().getSchemaForSymbol(ctx.params.symbol);
  });

  router.get('/schemas', async (ctx) => {
    const symbols = getGenerator().getMainFileSymbols(originGetGenerator.getProgram());
    ctx.body = getGenerator().getSchemaForSymbols(symbols);
  });

  router.get('/symbols', async (ctx) => {
    ctx.body = getGenerator().getMainFileSymbols(originGetGenerator.getProgram());
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
}
