package br.ufpr.bantads.ms_cliente;

import br.ufpr.bantads.ms_cliente.model.Cliente;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cliente> listar() {
        return service.listarClientes();
    }

    @GetMapping("/{cpf}")
    public Cliente buscarPorCpf(@PathVariable String cpf) {
        return service.buscarPorCpf(cpf);
    }

    @PostMapping
    public Cliente salvar(@RequestBody Cliente cliente) {
        return service.salvarCliente(cliente);
    }

    @PutMapping
    public Cliente atualizar(@RequestBody Cliente cliente) {
        return service.atualizarCliente(cliente);
    }

    @DeleteMapping("/{cpf}")
    public void remover(@PathVariable String cpf) {
        service.removerCliente(cpf);
    }

    @PostMapping("/depositar/{cpf}")
    public Cliente depositar(@PathVariable String cpf, @RequestParam double valor) {
        return service.depositar(cpf, valor);
    }

    @PostMapping("/sacar/{cpf}")
    public Cliente sacar(@PathVariable String cpf, @RequestParam double valor) {
        return service.sacar(cpf, valor);
    }

    @PostMapping("/transferir")
    public boolean transferir(@RequestParam String origem,
                              @RequestParam String destino,
                              @RequestParam double valor) {
        return service.transferir(origem, destino, valor);
    }
}
