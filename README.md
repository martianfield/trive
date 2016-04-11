# trive


## Sequences

To create a sequence use `trive.sequence.create(<options>)`.

### Options

The options object takes the following properties:

* `initial` - the initial value (a number) from which to start the sequence. The first item in the sequence will have this value. Default value is `1` (is ignored if you pass a `governor`)
* `cycles` - the number of cycles to create (is ignored if you pass a `governor`)
* `increase` - the value by which to increase an item's value. More details: see `mode`
* `mode` - the mode to use to calculate the value of items. There are two modes:
    * `sequence.modes.Linear` (default) - the linear mode calculates an item's value by adding the `increase` value to the value of the predecessor / governor
    * `sequence.modes.Exponential` - calculates an item's value by multiplying its predecessor's / governor's value with the `increase` value
* `governor` - a sequence used to base values on. If you pass a governor the sequence will have
    * the same number of cycles as the governor (i.e. the `cycles` value is ignored)
    * have its item values based on the item values of the governor (instead of using an item's predecessor as the base value)
     
### Result

The result of `sequence.create` is an object of the following structure:

```json
{
    items:[
        { value: 1 },
        ...
        { value: n }
    ]
}
```
    
    
### Examples

#### Linear Sequence without Governor

```javascript
const sequence = require('trive').sequence

let options = {
    cycles: 3,
    initial: 10,
    increase: 5,
    mode: sequence.modes.Linear
}
let s = sequence.create(options)
```

The resulting sequence `s` looks like this:

```json
{
    items: [
        { value: 10 },
        { value: 15 },
        { value: 20 }
    ]
}
```

#### Exponential Sequence without Governor

```javascript
let options = {
    initial:10,
    cycles:3,
    increase:1.5,
    mode:sequence.modes.Exponential
}

let s = sequence.create(options)
```

The resulting sequence `s` looks like this:

```json
{
    items: [
        { value: 10 },
        { value: 15 },
        { value: 22.5 }
    ]
}
``` 


#### Sequnece with Governor