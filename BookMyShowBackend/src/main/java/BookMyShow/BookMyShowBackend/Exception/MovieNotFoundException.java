package BookMyShow.BookMyShowBackend.Exception;

public class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException(String movieName) {
        super(movieName);

    }


}
