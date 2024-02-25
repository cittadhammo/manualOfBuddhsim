---
title: Table Analysis
---

## Top 10 of quoting other entries (outgoing edges)

```js
const data = FileAttachment("./data/data2-1.json").json();
const allNodes = []
const allLinks = [] 
	data.forEach(node => {
		node.info.links.pop(); // correcting data flaws
		allNodes.push({id:node.file, group:1, info:node.info, incoming:[]})
	// 	node.info.links.forEach(link => allLinks.push({source:node.file, target:link, value: 1}))
	})
	data.forEach(node => {
		node.info.links.forEach(link => {if(allNodes.find(n => n.id == link)) 
			allLinks.push({source:node.file, target:link, value: 1})
		})
	})

data.sort((a,b)=>{return b.info.links.length - a.info.links.length})
  for(let i=0; i<20; i++) {
	console.log(data[i].info.links.length, data[i].info.title2, data[i].info.titleEn)
  }

  allLinks.forEach(link => {
	
		const nodeFound = allNodes.find(node=>node.id == link.target)
		if (nodeFound) {
			nodeFound.incoming.push(link.source)
		}
  })

  allNodes.sort((a,b)=>b.incoming.length-a.incoming.length)

return data

```

## Top 10 of being quoted in other entries (incoming edges)

## Top 20 combine