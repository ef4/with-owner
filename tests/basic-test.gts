import { withOwner } from '#src/index.ts';
import type Owner from '@ember/owner';
import Service from '@ember/service';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('with-owner basics', function (hooks) {
  setupRenderingTest(hooks);

  class ExampleService extends Service {
    format(message: string): string {
      return `example service saw: [${message}]`;
    }
  }

  hooks.beforeEach(function () {
    this.owner.register('service:example', ExampleService);
  });

  test('it works', async function (assert) {
    const exampleHelper = withOwner(function exampleHelper(
      owner: Owner,
      s: string,
    ): string {
      return (owner.lookup('service:example') as ExampleService).format(s);
    });

    await render(
      <template>
        <div data-test>{{exampleHelper "hi"}}</div>
      </template>,
    );
    assert.dom('[data-test]').hasText('example service saw: [hi]');
  });

  test('it typechecks with heterogeneous arguments', async function (assert) {
    const exampleHelper = withOwner(function exampleHelper(
      owner: Owner,
      s: string,
      n: number,
    ): string {
      return (owner.lookup('service:example') as ExampleService).format(
        s + String(n),
      );
    });

    await render(
      <template>
        <div data-test>{{exampleHelper "hi" 5}}</div>
      </template>,
    );
    assert.dom('[data-test]').hasText('example service saw: [hi5]');
  });
});
