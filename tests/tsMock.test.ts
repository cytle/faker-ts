import { assert } from 'chai';
import { tsMock, tsMockGenerator, tsMockService } from '../lib/tsMock';
import { getApiFiles } from './getApiFiles';

// TODO: more unit test
describe('tsMock', () => {
  const files = getApiFiles();
  const mockData = tsMock(files);
  assert.equal(mockData.a, 123);
});
describe('tsMockGenerator', () => {
  const files = getApiFiles();

  const mockGenerator = tsMockGenerator(files);
  const mockData = mockGenerator('IFoo');
  assert.equal(mockData.a, 123);
});
describe('tsMockService', () => {
  const files = getApiFiles();

  const mockGenerator = tsMockService(files);
  const mockData = mockGenerator('IFoo');
  assert.equal(mockData.a, 123);
});
