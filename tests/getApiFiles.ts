import * as fs from 'fs';
import path from 'path';

export const getApiFiles = () => {
  const dir = path.resolve(__dirname, 'apis');

  return fs
    .readdirSync(dir)
    .filter(
      (fileName) =>
        fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === '.ts',
    )
    .map((vo) => path.join(dir, vo));
};
