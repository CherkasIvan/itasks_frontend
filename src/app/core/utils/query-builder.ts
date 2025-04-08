export function getSearchQuerys(model): string[] {
  let resultKeys = Object.keys(model);
  resultKeys = resultKeys.map(el => {
    if (Array.isArray(model[el])) {
      return `${el}=${model[el].join(',')}`;
    }
    if (el && model[el]) {
      return `${el}=${encodeURI(model[el])}`;
    }
    return null;
  });
  return resultKeys;
}
