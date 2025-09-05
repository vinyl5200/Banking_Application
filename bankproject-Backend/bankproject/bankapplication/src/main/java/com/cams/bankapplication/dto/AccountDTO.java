package com.cams.bankapplication.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AccountDTO {
    private String accountNumber;
    private BigDecimal balance;
    private String username;
}
