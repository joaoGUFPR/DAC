package com.example.saga.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String EXCHANGE = "saga-exchange";

    public static final String QUEUE_CLIENTE_CRIADO = "cliente.criado.queue";
    public static final String ROUTING_CLIENTE_CRIADO = "cliente.criado";

    public static final String QUEUE_CONTA_CRIAR = "conta.criar.queue";
    public static final String ROUTING_CONTA_CRIAR = "conta.criar";

    public static final String QUEUE_CLIENTE_APROVADO = "cliente.aprovado.queue";
    public static final String ROUTING_CLIENTE_APROVADO = "cliente.aprovado";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue clienteCriadoQueue() {
        return new Queue(QUEUE_CLIENTE_CRIADO, true);
    }

    @Bean
    public Queue contaCriarQueue() {
        return new Queue(QUEUE_CONTA_CRIAR, true);
    }

    @Bean
    public Queue clienteAprovadoQueue() {
        return new Queue(QUEUE_CLIENTE_APROVADO, true);
    }

    @Bean
    public Binding bindClienteCriado() {
        return BindingBuilder.bind(clienteCriadoQueue())
                .to(exchange())
                .with(ROUTING_CLIENTE_CRIADO);
    }

    @Bean
    public Binding bindCriarConta() {
        return BindingBuilder.bind(contaCriarQueue())
                .to(exchange())
                .with(ROUTING_CONTA_CRIAR);
    }

    @Bean
    public Binding bindClienteAprovado() {
        return BindingBuilder.bind(clienteAprovadoQueue())
                .to(exchange())
                .with(ROUTING_CLIENTE_APROVADO);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory) {

        SimpleRabbitListenerContainerFactory factory =
                new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jsonMessageConverter());
        return factory;
    }
}
