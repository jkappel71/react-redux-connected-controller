
const configure = (
  baseUrl,
  schemaKey = null,
  schemaPath = null) => {
  if (!baseUrl) {
    // eslint-disable-next-line no-console
    return console.error('baseUrl is required when configuring a domain controller!');
  }
  return {
    baseUrl,
    schemaKey,
    schemaPath,
  };
};

export {
  configure,
};
