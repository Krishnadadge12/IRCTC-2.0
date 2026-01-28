package com.mrc.util;

import java.time.LocalDate;
import org.springframework.stereotype.Component;

@Component
public class PnrGenerator {

    public String generate(Long trainNo, LocalDate journeyDate) {
        int random = (int) (Math.random() * 9000) + 1000;

        return trainNo + "-" +
               journeyDate.toString().replace("-", "").substring(4) +
               "-" + random;
    }
}
