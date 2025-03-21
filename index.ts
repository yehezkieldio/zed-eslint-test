/**
 * Performs a breadth-first search on a graph.
 *
 * @param graph - The adjacency list representation of the graph.
 * @param startNode - The node to start the BFS from.
 * @param visitCallback - Optional callback function to execute when visiting each node.
 * @returns - Array of nodes in BFS traversal order.
 */
function bfs<T>(graph: Map<T, T[]>, startNode: T, visitCallback?: (node: T) => void): T[] {
    // Set to keep track of visited nodes
    const visited = new Set<T>();

    // Queue for BFS traversal
    const queue: T[] = [];

    // Result array to store traversal order
    const result: T[] = [];

    // Enqueue the starting node
    queue.push(startNode);
    visited.add(startNode);

    // Process nodes in the queue
    while (queue.length > 0) {
        // Dequeue a node
        const currentNode = queue.shift()!;

        // Add to result
        result.push(currentNode);

        // Execute callback if provided
        if (visitCallback) {
            visitCallback(currentNode);
        }

        // Get all adjacent vertices of the dequeued node
        // If an adjacent has not been visited, mark it visited and enqueue it
        const neighbors = graph.get(currentNode) || [];

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}

// Usage
const graph = new Map<string, string[]>();

graph.set("A", ["B", "C"]);
graph.set("B", ["A", "D", "E"]);
graph.set("C", ["A", "F"]);
graph.set("D", ["B"]);
graph.set("E", ["B", "F"]);
graph.set("F", ["C", "E"]);

const result = bfs(graph, "A", console.log);
console.log(result); // ['A', 'B', 'C', 'D', 'E', 'F']
