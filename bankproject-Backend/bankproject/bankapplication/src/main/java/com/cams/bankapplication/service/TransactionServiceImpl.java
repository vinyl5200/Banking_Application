package com.cams.bankapplication.service;

import com.cams.bankapplication.dto.TransferRequest;
import com.cams.bankapplication.exception.*;
import com.cams.bankapplication.model.*;
import com.cams.bankapplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired private AccountRepository accountRepository;
    @Autowired private TransactionRepository transactionRepository;

    @Override
    @Transactional
    public void transferFunds(TransferRequest transferRequest, UserDetails userDetails) {
        if (transferRequest.getFromAccountNumber().equals(transferRequest.getToAccountNumber())) {
            throw new IllegalArgumentException("Source and destination accounts cannot be the same.");
        }

        Account fromAccount = accountRepository.findByAccountNumber(transferRequest.getFromAccountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Source account not found: " + transferRequest.getFromAccountNumber()));

        Account toAccount = accountRepository.findByAccountNumber(transferRequest.getToAccountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Destination account not found: " + transferRequest.getToAccountNumber()));

        if (!fromAccount.getUser().getUsername().equals(userDetails.getUsername())) {
            throw new UnauthorizedAccessException("You are not authorized to perform transactions from this account.");
        }

        if (fromAccount.getBalance().compareTo(transferRequest.getAmount()) < 0) {
            throw new InsufficientFundsException("Insufficient funds in the source account.");
        }

        fromAccount.setBalance(fromAccount.getBalance().subtract(transferRequest.getAmount()));
        toAccount.setBalance(toAccount.getBalance().add(transferRequest.getAmount()));
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        Transaction transaction = new Transaction();
        transaction.setFromAccount(transferRequest.getFromAccountNumber());
        transaction.setToAccount(transferRequest.getToAccountNumber());
        transaction.setAmount(transferRequest.getAmount());
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setDescription("Fund Transfer");
        transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionHistory(String accountNumber, UserDetails userDetails) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with number: " + accountNumber));

        if (!account.getUser().getUsername().equals(userDetails.getUsername())) {
            throw new UnauthorizedAccessException("You are not authorized to view this account's history.");
        }

        return transactionRepository.findByFromAccountOrToAccountOrderByTimestampDesc(accountNumber, accountNumber);
    }
}