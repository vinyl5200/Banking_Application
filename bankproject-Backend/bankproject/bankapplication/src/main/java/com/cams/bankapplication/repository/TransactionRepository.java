package com.cams.bankapplication.repository;

import com.cams.bankapplication.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByFromAccountOrToAccountOrderByTimestampDesc(String fromAccount, String toAccount);
}

