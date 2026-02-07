package com.mrc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.PnrStatusResponseDto;
import com.mrc.service.PnrService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pnr")
@RequiredArgsConstructor
public class PnrController {

    private final PnrService pnrService;

    @GetMapping("/{pnr}")
    public ResponseEntity<PnrStatusResponseDto> getPnrStatus(
            @PathVariable String pnr) {

        return ResponseEntity.ok(
                pnrService.getPnrStatus(pnr)
        );
    }
}
