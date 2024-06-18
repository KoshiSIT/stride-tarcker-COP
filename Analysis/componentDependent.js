const fs = require("fs");
const path = require("path");
const graphviz = require("graphviz");
const components = require("./result.json");

// ディレクトリの作成
const graphsDir = path.join(__dirname, "graphs");
if (!fs.existsSync(graphsDir)) {
  fs.mkdirSync(graphsDir);
}

// グローバルノードセットとエッジマップの作成
let globalNodes = new Set(components.map((c) => c.name));
let edgesMap = new Map();

components.forEach((component) => {
  if (component.children && component.children.length > 0) {
    edgesMap.set(component.name, component.children);
  }
});

// DFSを使用してサブグラフを検出する関数
function findSubgraph(node, edgesMap, visited = new Set()) {
  visited.add(node);
  let subgraph = { nodes: [node], hasEdges: false };

  if (edgesMap.has(node)) {
    subgraph.hasEdges = true;
    edgesMap.get(node).forEach((child) => {
      if (!visited.has(child)) {
        let childSubgraph = findSubgraph(child, edgesMap, visited);
        subgraph.nodes = subgraph.nodes.concat(childSubgraph.nodes);
        subgraph.hasEdges = subgraph.hasEdges || childSubgraph.hasEdges;
      }
    });
  }

  return subgraph;
}

// サブグラフの検出と出力
let subgraphIndex = 0;
while (globalNodes.size > 0) {
  let currentNode = globalNodes.values().next().value;
  let { nodes: subgraphNodes, hasEdges } = findSubgraph(currentNode, edgesMap);

  // エッジを持つサブグラフのみを出力する
  if (hasEdges) {
    let g = graphviz.digraph("G" + subgraphIndex);
    g.set("rankdir", "TB");

    // サブグラフのノードとエッジを追加
    subgraphNodes.forEach((node) => {
      g.addNode(node);
      globalNodes.delete(node); // グローバルリストから削除
      if (edgesMap.has(node)) {
        edgesMap.get(node).forEach((child) => {
          g.addEdge(node, child);
        });
      }
    });

    // サブグラフを画像として出力
    g.output("png", path.join(graphsDir, `graph_${subgraphIndex}.png`));
    subgraphIndex++;
  } else {
    // エッジを持たないサブグラフのノードをグローバルリストから削除
    subgraphNodes.forEach((node) => globalNodes.delete(node));
  }
}
