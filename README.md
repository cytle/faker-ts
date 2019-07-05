# json-schema-mock.ts

Mock data from TypeScript

## Usage

``` ts
import { tsMock, tsMockService } from 'json-schema-mock.ts';

const files = ['foo.ts'];
// foo.ts
// export interface IFoo { a: string }

const mocker = tsMock(files);
mocker.generateMock('IFoo'); // { "a": "commodo voluptate pariatur" }

// or listening file change
const mocker = tsMockService(files);
```
