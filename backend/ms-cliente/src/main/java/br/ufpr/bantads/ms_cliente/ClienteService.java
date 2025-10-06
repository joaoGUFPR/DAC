package br.ufpr.bantads.ms_cliente.service;

import br.ufpr.bantads.ms_cliente.model.Cliente;
import br.ufpr.bantads.ms_cliente.repository.ClienteRepository;
import br.ufpr.bantads.ms_cliente.exception.ClienteNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> listarClientes() {
        return repository.findAll();
    }

    public Cliente salvarCliente(Cliente cliente) {
        return repository.save(cliente);
    }

    public Cliente buscarPorCpf(String cpf) {
        return repository.findByCpf(cpf)
                .orElseThrow(() -> new ClienteNotFoundException("Cliente não encontrado"));
    }

    public void removerCliente(String cpf) {
        Cliente cliente = buscarPorCpf(cpf);
        repository.delete(cliente);
    }

    public Cliente atualizarCliente(Cliente clienteAtualizado) {
        Cliente cliente = buscarPorCpf(clienteAtualizado.getCpf());
        cliente.setNome(clienteAtualizado.getNome());
        cliente.setSaldo(clienteAtualizado.getSaldo());
        cliente.setEndereco(clienteAtualizado.getEndereco());
        return repository.save(cliente);
    }

    public double getSaldo(String cpf) {
        return buscarPorCpf(cpf).getSaldo();
    }

    public Cliente depositar(String cpf, double valor) {
        Cliente cliente = buscarPorCpf(cpf);
        if (valor > 0) {
            cliente.setSaldo(cliente.getSaldo() + valor);
            return repository.save(cliente);
        }
        throw new IllegalArgumentException("Valor inválido");
    }

    public Cliente sacar(String cpf, double valor) {
        Cliente cliente = buscarPorCpf(cpf);
        if (valor > 0 && cliente.getSaldo() >= valor) {
            cliente.setSaldo(cliente.getSaldo() - valor);
            return repository.save(cliente);
        }
        throw new IllegalArgumentException("Saldo insuficiente");
    }

    public boolean transferir(String contaOrigem, String contaDestino, double valor) {
        Cliente origem = repository.findByConta(contaOrigem)
                .orElseThrow(() -> new ClienteNotFoundException("Conta de origem não encontrada"));
        Cliente destino = repository.findByConta(contaDestino)
                .orElseThrow(() -> new ClienteNotFoundException("Conta de destino não encontrada"));

        if (valor > 0 && origem.getSaldo() >= valor) {
            origem.setSaldo(origem.getSaldo() - valor);
            destino.setSaldo(destino.getSaldo() + valor);
            repository.save(origem);
            repository.save(destino);
            return true;
        }
        return false;
    }
}
