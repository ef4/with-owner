import { setHelperManager, capabilities } from '@ember/helper';

class HelperWithOwner {
  capabilities = capabilities('3.23', {
    hasValue: true
  });
  #owner;
  constructor(owner) {
    if (!owner) {
      throw new Error(`withOwner() wrapped function tried to run with no owner`);
    }
    this.#owner = owner;
  }
  createHelper(fn, args) {
    return {
      fn,
      args
    };
  }
  getValue({
    fn,
    args: {
      named,
      positional
    }
  }) {
    // this mimics the pattern in ember's built-in default function helper
    // manager. The for loop is a cheeky optimization for checking whether
    // there's any content in `named`.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ in named) {
      const argsForFn = [...positional, named];
      return fn(this.#owner, ...argsForFn);
    }
    return fn(this.#owner, ...positional);
  }
}
function withOwner(fn) {
  setHelperManager(owner => new HelperWithOwner(owner), fn);
  return fn;
}

export { withOwner };
//# sourceMappingURL=index.js.map
