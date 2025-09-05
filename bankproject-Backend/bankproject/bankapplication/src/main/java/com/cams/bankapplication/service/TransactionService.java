package com.cams.bankapplication.service;

import com.cams.bankapplication.dto.TransferRequest;
import com.cams.bankapplication.model.Transaction;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.List;

public interface TransactionService {
    void transferFunds(TransferRequest transferRequest, UserDetails userDetails);
    List<Transaction> getTransactionHistory(String accountNumber, UserDetails userDetails);
}
