import { capabilities } from '@ember/helper';
import type Owner from '@ember/owner';
import type { HelperManager, Arguments } from '@glimmer/interfaces';
import { setHelperManager } from '@ember/helper';

type AnyFunction = (...args: unknown[]) => unknown;

interface State {
  fn: AnyFunction;
  args: Arguments;
}

class HelperWithOwner implements HelperManager<State> {
  capabilities = capabilities('3.23', {
    hasValue: true,
  });

  #owner: Owner;
  constructor(owner: Owner | undefined) {
    if (!owner) {
      throw new Error(
        `withOwner() wrapped function tried to run with no owner`,
      );
    }
    this.#owner = owner;
  }
  createHelper(fn: AnyFunction, args: Arguments): State {
    return { fn, args };
  }
  getValue({ fn, args: { named, positional } }: State): unknown {
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

export function withOwner<In extends unknown[], Out>(
  fn: (owner: Owner, ...params: In) => Out,
): (...params: In) => Out {
  setHelperManager(
    (owner: Owner | undefined) => new HelperWithOwner(owner),
    fn,
  );
  return fn as unknown as (...params: In) => Out;
}
