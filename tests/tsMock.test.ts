import { assert } from 'chai';
import { tsMock, tsMockService } from '../lib/tsMock';
import { getApiFiles } from './getApiFiles';

// TODO: more unit test
describe('tsMock', () => {
  const files = getApiFiles();
  const mockData = tsMock(files).generateMock('IFoo');
  assert.equal(mockData.a, 123);
});
describe('tsMockService', () => {
  const files = getApiFiles();

  const mocker = tsMockService(files);
  const mockData = mocker.generateMock('IFoo');
  assert.equal(mockData.a, 123);
});
