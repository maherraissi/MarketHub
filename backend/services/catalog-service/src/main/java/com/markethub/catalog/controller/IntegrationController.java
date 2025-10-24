package com.markethub.catalog.controller;

import com.markethub.catalog.config.RabbitConfig;
import com.markethub.catalog.dto.EmailRequestDto;
import com.markethub.catalog.dto.EventMessageDto;
import com.markethub.catalog.service.MailService;
import com.markethub.catalog.service.RabbitEventService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/catalog/integrations")
public class IntegrationController {

  private final RabbitTemplate rabbitTemplate;
  private final MailService mailService;
  private final RabbitEventService rabbitEventService;

  public IntegrationController(RabbitTemplate rabbitTemplate, MailService mailService, RabbitEventService rabbitEventService) {
    this.rabbitTemplate = rabbitTemplate;
    this.mailService = mailService;
    this.rabbitEventService = rabbitEventService;
  }

  @PostMapping("/rabbit")
  public ResponseEntity<Map<String, String>> publishRabbit(@RequestBody EventMessageDto body) {
    rabbitTemplate.convertAndSend(RabbitConfig.CATALOG_EVENTS_QUEUE, body.message());
    return ResponseEntity.ok(Map.of("status", "SENT", "queue", RabbitConfig.CATALOG_EVENTS_QUEUE));
  }

  @GetMapping("/rabbit/last")
  public ResponseEntity<Map<String, String>> lastRabbitMessage() {
    String last = rabbitEventService.getLastMessage();
    return ResponseEntity.ok(Map.of("last", last == null ? "" : last));
  }

  @PostMapping("/mail")
  public ResponseEntity<Map<String, String>> sendMail(@RequestBody EmailRequestDto req) {
    mailService.send(req.to(), req.subject(), req.body());
    return ResponseEntity.ok(Map.of("status", "SENT"));
  }
}
