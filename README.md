## ee-machine-id

Creates a unique id for the machine this is running on. The id is 
created using all mac addresses of the system, the cpu model and 
the systems total memory amount. the id is returned in form of a 
md5 hash.


```javascript

import machineId from 'ee-machine-id';

// get id
const id = machineId(); 

console.log(id) // 693d3ea0bbf68c98e08da139ff0f412b
```

Requires es6 modules!