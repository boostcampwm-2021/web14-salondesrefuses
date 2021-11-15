import { Controller, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

@Controller()
export class SseController {

    @Sse('sse')
    sendServerTime(): Observable<MessageEvent> {
        return interval(1000).pipe(
            map((_) => ({ data: Date.now().toString() } as MessageEvent))
        );
    }
}
