package com.krystian.intership.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ShortestPathDTO {
    List<String> path;
    Long length;
}
