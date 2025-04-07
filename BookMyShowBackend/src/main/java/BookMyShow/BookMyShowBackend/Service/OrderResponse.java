package BookMyShow.BookMyShowBackend.Service;

// New response class
public class OrderResponse {
    private String orderId;

    public OrderResponse(String orderId) {
        this.orderId = orderId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
