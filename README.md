# bedrock-angular-model
Bedrock AngularJS Model Utilities

An [AngularJS][] module that provides a service with utility functions for
manipulating models. It is primarily used to update objects and objects in
arrays in-place, to help simplify watch code, etc.

## Quick Examples

```js
angular.module('example', ['bedrock.model']).directive('my-directive', factory);

/* @ngInject */
function factory(brModelService) {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope, element) {
      var model = {
        oldItem: {},
        anArray: []
      };

      scope.replaceItem = function(newItem) {
        // replace `oldItem` keys with key-value pairs from newItem
        brModelService.replace(model.oldItem, newItem);
      };

      scope.replaceItemInArray = function(newItem) {
        // replace existing item with `newItem` when `id` property matches
        // otherwise push `newItem` onto the array
        brModelService.replaceInArray(model.anArray, newItem, function(a, b) {
          return a.id === b.id;
        });
      };

      scope.replaceArray = function(newItemArray) {
        // overwrite matching items in an array if they exist, otherwise
        // push them onto the array
        brModelService.replaceArray(
          model.anArray, newItemArray, function(item, candidate) {
            return item.id === canidate.id;
          });
      };

      scope.removeItemFromArray = function(id) {
        // remove an item from an array when its `id` matches
        brModelService.removeFromArray(model.anArray, function(e) {
          return e.id === id;
        });
      };

      scope.removeAllFromArray = function(key) {
        // remove all items that match `key` from an array
        brModelService.removeFromArray(model.anArray, function(e) {
          return e.key === key;
        });
      };
    }
  };
}
```

## Setup

```
bower install bedrock-angular-model
```

If you're using [bedrock-angular][], installation of the module followed by
a restart of your [bedrock][] server is sufficient to make the directive
available to your application.

To manually add **bedrock-angular-model** as a dependency:

```js
angular.module('myapp', ['bedrock.model']);
```

## API

### brModelService.replace(dst, src, [fn])

Updates an existing object in-place. For every key in `src`, the value in `dst`
associated with the same key is updated in-place (recursively) with the value
from `src`. If `fn` is given, it will be used as a comparison function for
replacing objects in arrays. Any keys that aren't in `src` are deleted from
`dst`.

### brModelService.replaceInArray(dst, src, fn)

Updates an object in-place in an array. `fn` will be called for each element in
`dst`, until it returns `true`. If it returns `true`, then the related element
from `dst` will be updated in-place to match `src`. If `fn` never returns
`true` for any element of `dst`, then `src` is pushed onto `dst`.

### brModelService.replaceArray(dst, src, fn)

Updates an array in-place using the elements from another array. For each
element in `src`, a matching element in `dst` will be sought out using `fn`.
If `fn` returns `true` when comparing an element from `src` and an element
from `dst`, then the element in `dst` will be updated in-place with the element
from `src`. If there is no matching element in `dst`, the element from `src`
will be pushed onto `dst`. If there are any elements in `dst` that have no
match in `src`, they will be removed.

### brModelService.removeFromArray(array, fn)

Updates an array in-place by removing a specific element. `fn` will be called
for each element in `array`, until it returns `true`. If `fn` returns `true`,
then the element will be removed from `array`.

### brModelService.removeAllFromArray(array, fn)

Updates an array in-place by removing all elements that match a particular
criteria. `fn` will be called for each element in `array`. If `fn` returns
`true`, the element will be removed from `array`.


[bedrock]: https://github.com/digitalbazaar/bedrock
[bedrock-angular]: https://github.com/digitalbazaar/bedrock-angular
[AngularJS]: https://github.com/angular/angular.js
