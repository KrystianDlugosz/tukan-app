package com.krystian.intership.service;

import com.krystian.intership.model.Graph;
import com.krystian.intership.model.ShortestPathDTO;

public interface IShortestPathSolver {
    ShortestPathDTO solve(Graph graph);
}
