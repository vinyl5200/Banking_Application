package com.cams.bankapplication.controller;

import com.cams.bankapplication.dto.AccountDTO;
import com.cams.bankapplication.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/my-account")
    public ResponseEntity<AccountDTO> getAccountDetails(@AuthenticationPrincipal UserDetails userDetails) {
        AccountDTO accountDetails = accountService.getAccountDetails(userDetails);
        return ResponseEntity.ok(accountDetails);
    }
}
