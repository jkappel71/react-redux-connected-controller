import R from 'ramda';
import memoize from 'fast-memoize';
import { schema } from 'normalizr';
// import * as apiMeta from 'lib/awaits/apiMeta';

const Controller = function (config) {
  this.config = config;

  const getOwnProperties = (obj) => {
    const properties = [];
    if (typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] !== 'function') {
          properties.push(key);
        }
      }
    }
    return properties;
  };

  const extendNode = (node, prop, path) => {
    const newNode = { ...node[prop] };
    newNode.config = newNode.config || {};
    newNode.config.baseUrl = newNode.config.baseUrl || R.prop('baseUrl', node.config);

    path.push(R.pathOr(prop, ['config', 'schemaKey'], newNode));
    newNode.config.schemaPath = newNode.config.schemaPath || path.join('');
    return newNode;
  };

  this.getEntity = memoize((entityKey, node, path = []) => {
    const props = getOwnProperties(node);
    for (const prop of props) {
      if (prop === entityKey) {
        return extendNode(node, prop, path);
      } else if (prop !== 'config') {
        const newNode = extendNode(node, prop, path);
        const entity = this.getEntity(entityKey, newNode, path);
        if (entity) return entity;
        path.pop();
      }
    }
    return null;
  });

  this.buildEntitySchema = memoize((schemaKey) => {
    const entity = this.getEntity(schemaKey, this.config);

    if (entity) {
      const entitySchema = new schema.Entity(entity.config.schemaPath);
      const schemaArray = [entitySchema];

      return {
        baseUrl: R.prop('baseUrl', entity.config),
        schema: entitySchema,
        schemaArray,
      };
    }
    return null;
  });

  this.actions = {
    delete: memoize((schemaKey, id) =>
      async (dispatch) => {
        const entitySchema = this.buildEntitySchema(schemaKey);
        const apiAction = {
          method: 'GET',
          url: `${entitySchema.baseUrl}/${id}`,
          schema: entitySchema.schema,
        };
        // return dispatch(apiMeta.getEntity(apiAction));
      },
    ),
    get: memoize((schemaKey, id) =>
      async (dispatch) => {
        const entitySchema = this.buildEntitySchema(schemaKey);
        const apiAction = {
          method: 'GET',
          url: `${entitySchema.baseUrl}/${id}`,
          schema: entitySchema.schema,
        };
        // return dispatch(apiMeta.getEntity(apiAction));
      },
    ),
  };

  this.selectors = {

  };

  return this;
};

export default Controller;
