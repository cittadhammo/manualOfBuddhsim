import * as d3 from "npm:d3";

export function force(data,invalidation){
  // Specify the dimensions of the chart.
  const width = 4000;
  const height = 4000;

  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // console.log(data)
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
  const data2 = {nodes:allNodes, links:allLinks};
  console.log(data.sort((a,b)=>{return b.info.links.length - a.info.links.length}))
  for(let i=0; i<20; i++) {
	console.log(data[i].info.links.length, data[i].info.title2, data[i].info.titleEn)
  }

  allLinks.forEach(link => {
	
		const nodeFound = allNodes.find(node=>node.id == link.target)
		if (nodeFound) {
			console.log('found: ', nodeFound)
			nodeFound.incoming.push(link.source)
		}
  })

  console.log('---Nodes---')
  console.log(allNodes.sort((a,b)=>b.incoming.length-a.incoming.length))

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = data2.links.map(d => ({...d}));
  const nodes = data2.nodes.map(d => ({...d}));
	
  console.log('---')
  console.log(data2)
  // Create a simulation with several forces.
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-700).theta(2.5))// 400 2.2
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

  // Create the SVG container.
  const svgOrigin = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  const svg = svgOrigin.append("g");


  // Add a line for each link, and a circle for each node.
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(links)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll()
    .data(nodes)
    .join("circle")
      .attr("r", 3)
      .attr("fill", d => color(d.group));

  node.append("title")
      .text(d => d.id);

  const label = svg
    .append("g")
    .attr("font-size", 8)
    //.attr("stroke-linejoin", "round")
    .attr("stroke-width", 1)
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("paint-order", "stroke")
    .attr("stroke", "white")
    //.attr("fill", (d) => {})
    //.attr("dy", "0.31em")
    .attr('x', 6)
    .text(d=>d.info.title2)
    //.append("tspan")
    //.style("font-style","italic")
    //.text(d=>d.id)

  const labelEn = svg
    .append("g")
    .attr("font-size", 5)
    //.attr("stroke-linejoin", "round")
    .attr("stroke-width", 1)
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("paint-order", "stroke")
    .attr("stroke", "white")
    //.attr("fill", (d) => {})
    .attr("dy", "1em")
    .attr('x', 6)
    .text(d=>d.info.titleEn2)
    //.append("tspan")
    .style("font-style","italic")
    //.text(d=>d.id)

  // Add a drag behavior.
  node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

  // Set the position attributes of links and nodes each time the simulation ticks.
  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);


    labelEn
    .attr(
      "transform",
      (d) => `
        translate(${d.x},${d.y}) 
      `
    );
    label
    .attr(
      "transform",
      (d) => `
        translate(${d.x},${d.y}) 
      `
    );

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  }

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  // When this cell is re-run, stop the previous simulation. (This doesn’t
  // really matter since the target alpha is zero and the simulation will
  // stop naturally, but it’s a good practice.)
  // invalidation.then(() => simulation.stop());

  const zoom = d3.zoom().scaleExtent([0.5, 8]).on("zoom", zoomed);
  svgOrigin.call(zoom);

  function zoomed({ transform }) {
    svg.attr("transform", transform);
  }

  return svgOrigin.node();
}