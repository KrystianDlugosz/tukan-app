package com.krystian.intership.controller;

import com.krystian.intership.model.Graph;
import com.krystian.intership.model.ShortestPathDTO;
import com.krystian.intership.service.IShortestPathSolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShortestPathController {

    @Autowired
    private IShortestPathSolver solver;

    @PostMapping("/solve")
    public ResponseEntity<ShortestPathDTO> solve(@RequestBody Graph graph) {
        return ResponseEntity.ok(solver.solve(graph));
    }

}
