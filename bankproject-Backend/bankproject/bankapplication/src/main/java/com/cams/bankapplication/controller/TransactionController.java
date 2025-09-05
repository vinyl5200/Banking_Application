package com.cams.bankapplication.controller;

import com.cams.bankapplication.dto.TransferRequest;
import com.cams.bankapplication.model.Transaction;
import com.cams.bankapplication.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.cams.bankapplication.dto.MessageResponse;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transfer")
    public ResponseEntity<?> transferFunds(@Valid @RequestBody TransferRequest transferRequest, @AuthenticationPrincipal UserDetails userDetails) {
        transactionService.transferFunds(transferRequest, userDetails);
        return ResponseEntity.ok(new MessageResponse("Transfer successful!"));
    }

    @GetMapping("/{accountNumber}")
    public ResponseEntity<List<Transaction>> getTransactionHistory(@PathVariable String accountNumber, @AuthenticationPrincipal UserDetails userDetails) {
        List<Transaction> history = transactionService.getTransactionHistory(accountNumber, userDetails);
        return ResponseEntity.ok(history);
    }
}
