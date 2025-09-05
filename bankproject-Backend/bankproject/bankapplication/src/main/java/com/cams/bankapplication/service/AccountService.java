package com.cams.bankapplication.service;

import com.cams.bankapplication.dto.AccountDTO;
import org.springframework.security.core.userdetails.UserDetails;

public interface AccountService {
    AccountDTO getAccountDetails(UserDetails userDetails);
}