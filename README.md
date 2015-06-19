# What The Flux

The best Flux library. WTF gives you a mental model which makes it easier to reason about which Flux library you should choose: What The Flux.

We don't yet have a kick-ass webpage with a cool domain such as `www.flux.wtf`, but we're working on it. Negotiating expensive domains isn't easy and not all open-source projects get to do this for self-promotion, but we're trying. ;)

- - -

### Dispatchers everywhere

Traditional Flux has only one single Dispatcher placed between Actions and Stores. WTF allows you to have multiple Dispatchers, between any two entities you wish, with a simple programming model. You could place a reactive Dispatcher between Stores and Views, and even a Dispatcher between Dispatchers. This enables data flow to automatically propagate between unidirectional Dispatchers.

```js
import * as WTF from 'wtf-flux';

@WTF.between(class Betweener extends WTF.Betweenable {
  injectDispatcher(dispatcher) {
    this.dispatcher = dispatcher.extract();
  }
  redispatch(dispatchable) {
    dispatchable.reflect(this.dispatcher.reextract());
  }
})
class Dispatcher extends WTF.Dispatchable {
  higherOrderSwitch(actionsHub) {
    switch (actionsHub.getActionCreator()) {
      case actionsHub.ACTION_CREATOR_1:
        switch actionsHub.getActionCreator(ACTION_CREATOR_1) {
          case ACTION_FOO:
            //...
            break;
          case ACTION_BAR:
            //...
            break;
        }
        break;
      case actionsHub.ACTION_CREATOR_2:
        switch actionsHub.getActionCreator(ACTION_CREATOR_2) {
          case ACTION_BAZ:
            //...
            break;
          case ACTION_FINAL:
            //...
            break;
        }
        break;
      default:
        const DAC = actionsHub.getTypeSafeDefaultActionCreator();
        DAC.redispatch();
    }
  }
}
``` 

### Declarative Dispatcher Actions

Use Dispatcher Actions to allow your Dispatcher to **declaratively** send one-way Actions to Stores while at the same time receiving real-time push events from Stores. It makes it easier to reason about state and data binding.

```js
import {Dispatchable, DefaultAction, AlternateAction} from 'wtf-flux';
import {ComponentFoo, ComponentBar} from 'src/my-components'; 

const DispatcherAction = (
  () => () => Dispatchable.instantiateAsDispatcherAction(dispatcher =>
    dispatcher.sendAction(ac => {
      switch (ac.getParentView()) {
        case ComponentFoo:
          // Notice how you can declaratively create actions with...
          // JSX! Yes! If we use JSX also for Higher-Order components,
          // why not for actions as well? This makes it declarative.
          return (
            <DefaultAction superConstructor={ComponentFoo.constructor}>
              <AlternateAction businessLogic={/* ... */} />
            </DefaultAction>
          );
        case ComponentBar:
          return (
            <AlternateAction 
              superConstructor={ComponentBar.constructor}
              businessLogic={/* ... */}
              />
          );
      }
    })
  )
);
```

### Reactive Action Creator Creators

Most Flux libraries allow you to create Actions with an Action Creator. However, this is often an imperative *action* (pun intended) because you need to explicitly call `createAction()`. Reactive Action Creator Creators allow you to create Action Creators reactively. This is so flexible you can even create Action Creator Creators, i.e., Action Creator Creator Creators.

**An Action Creator Creator**
```js
import * as WTF from 'wtf-flux';

const HigherOrderConstants = WTF.createConstants(
  [() => 'UPDATE_AGE', () => 'SET_NAME', () => 'REPLACE_MOTHER_IN_LAW']
);

@WTF.considerAs(context => 'generic')
class MyActionCreatorCreator extends WTF.GenericActionCreator {
  updateUpdateAge(newAge) {
    return function returnNewEra(newAge) { 
      this.dispatch(HigherOrderConstants.UPDATE_AGE, newAge);
    }
  }
  setSetName(name) {
    return function returnName(name) { 
      this.dispatch(HigherOrderConstants.SET_NAME, name);
    }
  }
  replaceReplaceMotherInLaw(niceLady) {
    return function returnLady(niceLady) { 
      this.dispatch(HigherOrderConstants.REPLACE_MOTHER_IN_LAW, niceLady);
    }
  }
}
```

**An Action Creator Creator Creator**
```js
import * as WTF from 'wtf-flux';

const HigherOrderConstants = WTF.createConstants([
  () => () => 'UPDATE_AGE',
  () => () => 'SET_NAME',
  () => () => 'REPLACE_MOTHER_IN_LAW'
]);

@WTF.considerAs(context => 'generic')
class MyActionCreatorCreatorCreator extends WTF.GenericActionCreator {
  updateUpdateUpdateAge(newAge) {
    return function returnNewEraFunc(newAge) { 
      return function returnNewEra(newAge) {
        this.dispatch(HigherOrderConstants.UPDATE_AGE, newAge);
      }
    }
  }
  setSetSetName(name) {
    return function returnNameFunc(name) {
      return function returnName(name) { 
        this.dispatch(HigherOrderConstants.SET_NAME, name);
      }
    }
  }
  replaceReplaceReplaceMotherInLaw(niceLady) {
    return function returnLadyFunc(niceLady) {
      return function returnLady(niceLady) { 
        this.dispatch(HigherOrderConstants.REPLACE_MOTHER_IN_LAW, niceLady);
      }
    }
  }
}
```

### Stateless referentially-transparent pure side-effectless functions

WTF provides a custom implementation of a function which forces the function to be free of side effects, hence easier to reason about. In WTF you don't use JavaScript's function which is by nature unsafe because it can always have side effects. Instead, you use `Funk`, a type-safe decorated class to represent data binding reactive pure functions in a type-safe model easier to reason about.

Instead of
```js
function stringToNumber(str) {
  console.log(str); // side effect!!!
  return parseInt(str);
}
```

You can use Funk:
```js
import * as WTF from `wtf`;

const stringToNumber = WTF.Funk({
  input: WTF.Funk.Types.string,
  output: WTF.Funk.Transformations.parseInt
}); // no side effects

// Usage:
let result; // must be mutable
stringToNumber("123", result);
console.log(result); // 123
```

As you noticed, we used `WTF.Funk.Transformations.parseInt`. This means you must use `Transformations.parseInt` instead of JavaScript's `parseInt()`. This also means we have referentially-transparent reactive versions of all transformations JavaScript is able to do, such as:

- `Funk.Transformations.addition`
- `Funk.Transformations.subtraction`
- `Funk.Transformations.multiplication`
- `Funk.Transformations.division`
- `Funk.Transformations.concatenation`
- `Funk.Transformations.object.set` (immutable! returns a new object)
- `Funk.Transformations.object.replace` (also immutable)

To compose these operations, use a Higher-Order Funk, in other words, a `Hi-Fu`.

### Model Stores

Vanilla Flux replaces the MVC mental model with Stores, Actions, and Dispatcher. Stores in Flux are different to Models in MVC because the latter starts with the reactive letter M. Also, Stores provide you the mental model of, well, a "Store"! This makes it much easier to reason about what they actually do: *data flow* analogous to *economy flow* with commercial transactions. On the other hand, there is a property of MVC Models which Stores lack: the presence of a mental **model**. WTF provides you Stores as a mental **model** in which reasoning about becomes easier and effortless. There is an easy helper function (in fact, a `Funk`), which delivers you Model Stores.

```js
const modelStoreCreator = Funk({
  input: Funk.Types.object,
  output: Funk.Transformations.objectToModelStore
});

let todoModelStore;
modelStoreCreator({
  todos: [],
  isEditing: false,
  filter: 'active'
}, todoModelStore);
```

Notice how `Funk.Transformations.objectToModelStore` is a special transformation which doesn't have an equivalent in JavaScript, hence this is a more powerful approach to one-way unidirectionality.

### Higher-Order Mental Model

WTF makes it easy to reason about components, but still gives you the power to reason about, and abstract, anything. Anything can be Higher-Order. As you can see, we can make Action Creator Creators, Dispatcher Dispatchers, Funk Funks, Mixin Mixins, with no limit. Leverage the power of an easier mental model on which you can reason about.

### LICENSE

The MIT License (MIT)

Copyright (c) 2014 Andre Staltz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
