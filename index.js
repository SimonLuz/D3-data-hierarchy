const data = [
  { name: 'news', parent: '' },
    
  { name: 'tech', parent: 'news' },
  { name: 'sport', parent: 'news' },
  { name: 'music', parent: 'news' },
    
  { name: 'ai', parent: 'tech', amount: 7 },
  { name: 'coding', parent: 'tech', amount: 5 },
  { name: 'tablets', parent: 'tech', amount: 4 },
  { name: 'laptops', parent: 'tech', amount: 6 },
  { name: 'd3', parent: 'tech', amount: 3 },
  { name: 'gaming', parent: 'tech', amount: 3 },
    
  { name: 'football', parent: 'sport', amount: 6 },
  { name: 'hockey', parent: 'sport', amount: 3 },
  { name: 'baseball', parent: 'sport', amount: 5 },
  { name: 'tennis', parent: 'sport', amount: 6 },
  { name: 'f1', parent: 'sport', amount: 1 },
    
  { name: 'house', parent: 'music', amount: 3 },
  { name: 'rock', parent: 'music', amount: 2 },
  { name: 'punk', parent: 'music', amount: 5 },
  { name: 'jazz', parent: 'music', amount: 2 },
  { name: 'pop', parent: 'music', amount: 3 },
  { name: 'classical', parent: 'music', amount: 5 },
];

const svg = d3.select(".canvas")
    .append("svg")
        .attr("width", 1060)
        .attr("height", 800);

// CREATE A GROUP
const graph = svg.append("g")
    .attr("translate", "transform(50, 50)"); // 50px MARGIN


// CREATE STRATIFY
const stratify = d3.stratify()
    .id(d => d.name) 
    .parentId(d => d.parent)


// CREATE a const with data 
const rootNode = stratify(data)
    .sum(d => d.amount); // DEFINES THE VALUE OF A GIVEN OBJECT

// GENERATE PACK
const pack = d3.pack()
    .size([960, 700])
    .padding(5) // distance btween circles

console.log(pack(rootNode))

// NEEDS TO BE PUT BACK INTO ARRAY - descendants() method
const bubbleData = pack(rootNode).descendants();
console.log(bubbleData)

// CREATE ORDINAL SCALE
const color = d3.scaleOrdinal(["#d1c4e9", "#b39ddb", "#9575cd"])

// JOIN DATA TO GROUP - each bubble will ba group
const nodes = graph.selectAll("g")
    .data(bubbleData)

    .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        
nodes.append("circle")
    .attr("r", d => d.r)
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("fill", d => color(d.depth))

// APPEND TEXT TO NODES THAT DON"T HAVE CHILDREN
nodes.filter(d => !d.children)
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.3em")
    .attr("fill", "white")
    .style("font-size", d => d.value * 5)
    .text(d => d.data.name)








