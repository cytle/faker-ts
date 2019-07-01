# json-schema-mock.ts

Mock data from TypeScript

## Usage

``` ts
import { tsMock, tsMockGenerator, tsMockService } from 'json-schema-mock.ts';

const files = ['foo.ts'];

tsMock(files);

const mockGenerator = tsMockGenerator(files);
mockGenerator('IFoo');

// or watch file change
const mockGenerator = tsMockService(files);
mockGenerator('IFoo');
```

### Koa

``` ts
import Koa from 'koa';
import { tsMock, tsMockGenerator, tsMockService } from 'json-schema-mock.ts';

const app = new Koa();
const mockGenerator = tsMockService(files);

app.use(async (ctx) => {
  try {
    const { schema } = ctx.query;
    ctx.body = JSON.stringify(mockGenerator(schema));
  } catch (error) {
    ctx.body = { msg: error.message };
  }
});
```
