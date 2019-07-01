import Koa from 'koa';
import Router from 'koa-router';
import * as ts from 'typescript';
import { tsMockService } from './tsMock';

export function createServer(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const app = new Koa();
  const router = new Router();

  const mockGenerator = tsMockService(files, jsonCompilerOptions, basePath);

  router.get('/api', async (ctx) => {
    try {
      const { api = 'IFoo' } = ctx.query;
      ctx.body = JSON.stringify(mockGenerator(api));
    } catch (error) {
      ctx.body = { msg: error.message };
    }
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
}
