package com.krystian.intership.model;

import java.util.List;

public class ShortestPathDTO {
    private List<String> path;
    private Long totalWeight;

    // Konstruktor
    public ShortestPathDTO(List<String> path, Long totalWeight) {
        this.path = path;
        this.totalWeight = totalWeight;
    }

    // Gettery i settery

    public List<String> getPath() {
        return path;
    }

    public void setPath(List<String> path) {
        this.path = path;
    }

    public Long getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(Long totalWeight) {
        this.totalWeight = totalWeight;
    }
}
