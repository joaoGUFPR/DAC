package br.ufpr.bantads.ms_cliente.service;

import org.springframework.stereotype.Service;

import br.ufpr.bantads.ms_cliente.model.Cliente;
import br.ufpr.bantads.ms_cliente.repository.ClienteRepository;

@Service // anotação para definir que essa classe é um serviço
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    Cliente criarCliente(Cliente cliente) {
        if(clienteRepository.findByCpf(cliente.getCpf()) != null) {
            throw new IllegalArgumentException("CPF já cadastrado");
            
        }else if(clienteRepository.findByEmail(cliente.getEmail()) != null) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        return clienteRepository.save(cliente);
    }
}
