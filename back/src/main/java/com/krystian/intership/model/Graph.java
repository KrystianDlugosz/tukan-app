package com.krystian.intership.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Graph {
    List<String> nodes;
    List<Edge> edges;
}
