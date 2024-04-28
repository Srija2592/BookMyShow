package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Repository.BookedDateInt;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class BookedDateService {
    private final BookedDateInt bookedDateInt;


}
