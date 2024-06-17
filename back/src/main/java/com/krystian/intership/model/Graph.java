package com.krystian.intership.model;

import java.util.List;

public class Graph {
    private List<String> nodes;
    private List<Edge> edges;

    // Gettery i settery

    public List<String> getNodes() {
        return nodes;
    }

    public void setNodes(List<String> nodes) {
        this.nodes = nodes;
    }

    public List<Edge> getEdges() {
        return edges;
    }

    public void setEdges(List<Edge> edges) {
        this.edges = edges;
    }
}
