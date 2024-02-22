---
title: Force Directed Graph
---

# Force Directed Graph

```js
import {force} from "./components/force.js";
//import {timeline} from "./components/timeline.js";
```

```js
//const events = FileAttachment("./data/events.json").json();
const dataForce = FileAttachment("./data/data2-1.json").json();
```

```js
//timeline(events, {height: 300})
force(dataForce)
```
