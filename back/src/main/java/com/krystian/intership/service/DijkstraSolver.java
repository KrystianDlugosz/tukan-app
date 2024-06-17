package com.krystian.intership.service;

import com.krystian.intership.model.Edge;
import com.krystian.intership.model.Graph;
import com.krystian.intership.model.ShortestPathDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class DijkstraSolver implements IShortestPathSolver {

    @Override
    public ShortestPathDTO solve(Graph graph) {
        Map<String, Long> dist = new HashMap<>();
        Map<String, String> prev = new HashMap<>();
        List<String> queue = new ArrayList<>();
        Map<String, Set<String>> nodeToNeighbours = new HashMap<>();

        for (String node : graph.getNodes()) {
            dist.put(node, Long.MAX_VALUE);
            prev.put(node, null);
            queue.add(node);
        }

        for (Edge edge : graph.getEdges()) {
            Set<String> v1 = nodeToNeighbours.getOrDefault(edge.getFrom(), new HashSet<>());
            v1.add(edge.getTo());
            nodeToNeighbours.put(edge.getFrom(), v1);

            Set<String> v2 = nodeToNeighbours.getOrDefault(edge.getTo(), new HashSet<>());
            v2.add(edge.getFrom());
            nodeToNeighbours.put(edge.getTo(), v2);
        }

        dist.put("S", 0L);

        while (!queue.isEmpty()) {
            String vertex = "";
            Long min = Long.MAX_VALUE;

            for (String node : queue) {
                if (dist.get(node) < min) {
                    vertex = node;
                    min = dist.get(node);
                }
            }
            queue.remove(vertex);
            Set<String> neighbours = nodeToNeighbours.get(vertex);

            Set<String> existingNeighbours = new HashSet<>();

            for (String neighbour : neighbours) {
                if (queue.contains(neighbour)) {
                    existingNeighbours.add(neighbour);
                }
            }

            for (String neighbour : existingNeighbours) {
                Long edgeWeight = getEdgeWeight(graph, vertex, neighbour);

                if (edgeWeight < 0) {
                    throw new RuntimeException("edgeWeight cannot be negative! actual value=" + edgeWeight);
                }
                Long alt = dist.get(vertex) + edgeWeight;

                if (alt < dist.get(neighbour)) {
                    dist.put(neighbour, alt);
                    prev.put(neighbour, vertex);
                }
            }
        }

        List<String> path = new ArrayList<>();
        String prevNode = prev.get("P");
        path.add("P");
        path.add(prevNode);

        while (!prevNode.equals("S")) {
            prevNode = prev.get(prevNode);
            path.add(prevNode);
        }

        Collections.reverse(path);
        return new ShortestPathDTO(path, dist.get("P"));
    }

    private Long getEdgeWeight(Graph graph, String from, String to) {
        for (Edge edge : graph.getEdges()) {
            if ((edge.getFrom().equals(from) && edge.getTo().equals(to))
                    || (edge.getFrom().equals(to) && edge.getTo().equals(from))) {
                return edge.getWeight();
            }
        }

        return -1L;
    }
}
