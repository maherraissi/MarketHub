package com.markethub.catalog.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;

@Configuration
@EnableRabbit
public class RabbitConfig {
  public static final String CATALOG_EVENTS_QUEUE = "catalog.events";

  @Bean
  public Queue catalogQueue() {
    // non durable for dev
    return new Queue(CATALOG_EVENTS_QUEUE, false);
  }
}
