# with-owner

Give plain Javascript helper functions access to `owner`:

```js
import { withOwner } from 'with-owner';

const format = withOwner(function(owner, message) {
  return owner.lookup('service:locale').format(message);
});

<template>
  <h1>{{format "Hello"}}</h1>
</template>
```

Build entirely on stable public API (the [HelperManager interface](https://api.emberjs.com/ember/7.3/functions/@ember%2Fhelper/setHelperManager/)).

## Compatibility

- Ember.js v5.8 or above
- Embroider or ember-auto-import v2

## Installation

```
ember install with-owner
```

## Usage

Your function will automagically receive `owner` as the first argument. The other arguments are unchanged from normal helper function invocation.

In typescript, it looks like:

```ts
import { withOwner } from 'with-owner';
import type Owner from '@ember/owner';

const format = withOwner(function(owner: Owner, message: string): string {
  return owner.lookup('service:locale').format(message);
});

<template>
  <h1>{{format "Hello"}}</h1>
</template>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
