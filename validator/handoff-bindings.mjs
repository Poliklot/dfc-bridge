// One exact native-path owner for producer resolution and consumer validation.
export function nativeBindingAliases(native) {
  const aliases = [];
  function collect(value, path) {
    if (!value || typeof value !== 'object') return;
    if (value.type === 'VARIABLE_ALIAS' && typeof value.id === 'string') aliases.push({ id: value.id, path });
    else for (const key of Object.keys(value).sort()) collect(value[key], path + '/' + key.replaceAll('~', '~0').replaceAll('/', '~1'));
  }
  collect(native.boundVariables, 'boundVariables');
  for (const field of ['fills', 'strokes', 'effects']) collect(native[field], field);
  return aliases;
}
