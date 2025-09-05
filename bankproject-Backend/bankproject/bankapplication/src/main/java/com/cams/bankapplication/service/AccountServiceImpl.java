package com.cams.bankapplication.service;

import com.cams.bankapplication.dto.AccountDTO;
import com.cams.bankapplication.exception.ResourceNotFoundException;
import com.cams.bankapplication.model.Account;
import com.cams.bankapplication.model.User;
import com.cams.bankapplication.repository.AccountRepository;
import com.cams.bankapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public AccountDTO getAccountDetails(UserDetails userDetails) {
        // Find the user by username
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + userDetails.getUsername()));

        // For simplicity, we'll assume a user has one primary account.
        // In a real system, you might have a list of accounts.
        // We also need to find the account linked to this user.
        // Let's assume we need to add a method to the AccountRepository for this.
        Account account = accountRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("No account found for user: " + user.getUsername()));

        // Map the entity to a DTO
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setAccountNumber(account.getAccountNumber());
        accountDTO.setBalance(account.getBalance());
        accountDTO.setUsername(user.getUsername());

        return accountDTO;
    }
}
