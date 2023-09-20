package BookMyShow.BookMyShowBackend.Entity;

import lombok.Builder;
import lombok.Data;

@Data

public class TransactionDetails {
    private String orderId;
    private String key;
    private String currency;
    private Integer amount;

    public TransactionDetails(String orderId, String currency, Integer amount,String key) {
        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
        this.key=key;
    }
}
