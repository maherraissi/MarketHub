package com.markethub.catalog.service;

import com.markethub.catalog.config.RabbitConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;

@Service
public class RabbitEventService {
  private static final Logger log = LoggerFactory.getLogger(RabbitEventService.class);
  private final AtomicReference<String> lastMessage = new AtomicReference<>(null);

  @RabbitListener(queues = RabbitConfig.CATALOG_EVENTS_QUEUE)
  public void consume(String message) {
    log.info("[RabbitEventService] Consumed message: {}", message);
    lastMessage.set(message);
  }

  public String getLastMessage() {
    return lastMessage.get();
  }
}
