import Controller from '../src/Controller'
import { configure } from '../src/utils/Controller';

const config = {
  Song: {
    config: configure(
      '/api/scheduling/song',
      'songs',
    ),
    Version: {
      Attachment: {},
      Key: {},
      Link: {},
    },
  },
};

describe('#baseController', () => {
  const controller = new Controller(config);

  test('getEntity should return null if the schemaKey is not found', () => {
    const result = controller.getEntity('SomeWrongValue', controller.config);
    expect(result).toBeNull();
  });
  test('getEntity should return the built out entity', () => {
    const result = controller.getEntity('Key', controller.config);
    expect(result).not.toBeNull();
    expect(result.config).not.toBeNull();
    expect(result.config.baseUrl).toBe(config.Song.config.baseUrl);
    expect(result.config.schemaPath).toBe('songsVersionKey');
  });

  test('buildEntitySchema should return null if the schemaKey is not found', async () => {
    const result = controller.buildEntitySchema('SomeWrongValue');
    expect(result).toBeNull();
  });
  test('buildEntitySchema should return the schema', () => {
    const result = controller.buildEntitySchema('Key');

    expect(result).not.toBeNull();

    expect(result.baseUrl).toBe('/api/scheduling/song');
    expect(result.schema._key).toBe('songsVersionKey');
    expect(result.schemaArray).not.toBeNull();
  });

  describe('controller should have actions', () => {
    test('all actions are present', async () => {
      expect(controller.actions).not.toBeNull();
      expect(controller.actions.delete).not.toBeNull();
      expect(controller.actions.get).not.toBeNull();
    });
    test('action "delete" should delete data', () => {

    });
    test('action "get" should delete data', () => {

    });
  });
  describe('controller should have selectors', () => {
    test('all selectors are present', async () => {
      expect(controller.selectors).not.toBeNull();
      expect(controller.selectors.get).not.toBeNull();
    });
    test('selector "get" should get data', () => {

    });
  });
});
