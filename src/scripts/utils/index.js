function s4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function generateGUID (prefix = 'class') {
  return `${prefix}-${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
}

export function wait (ms = 10) {
  let timeout;

  const _promise = new Promise((resolve) => {
    timeout = setTimeout(() => {
      resolve(timeout);
    }, ms);
  });

  _promise.cancel = () => clearTimeout(timeout);

  return _promise;
}

export const waitTmp = { cancel () { /* empty fn */ } };
