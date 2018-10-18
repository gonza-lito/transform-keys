# transform-keys
Simple nodejs module for transforming plain object keys written in typescript

# Install

npm install transform-keys-ts

# Usage


```
import { capitalize, map, slice } from 'lodash';

import {
    transformKeys
} from 'transform-keys-ts';
// convert snake case to camel case
transformKeys((key) => {
            const parts = key.split('_');
            const allButFirst = map(slice(parts, 1), (str) => capitalize(str));
            return [parts[0], ...allButFirst].join('');
        }, subject);
```

browse test for shorthand methods

# Build & Test

```npm install```

```npm run build``` 

```npm run test```

