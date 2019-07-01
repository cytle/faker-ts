import * as fs from 'fs';
import path from 'path';
import { createServer } from '../lib/koaServer';

const dir = path.resolve(__dirname, 'apis');

const currentDirectoryFiles = fs
  .readdirSync(dir)
  .filter(
    (fileName) =>
      fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === '.ts',
  )
  .map((vo) => path.join(dir, vo));

createServer(currentDirectoryFiles).listen(3000);
