package br.ufpr.bantads.ms_gerente;

@Service
public class GerenteService {
    private final GerenteRepository gerenteRepo;
    private final ClienteRepository clienteRepo;

    public GerenteService(GerenteRepository gerenteRepo, ClienteRepository clienteRepo) {
        this.gerenteRepo = gerenteRepo;
        this.clienteRepo = clienteRepo;
    }

    // ------------------ CRUD BÁSICO ------------------
    public List<Gerente> listarGerentes() {
        return gerenteRepo.findAll();
    }

    public Gerente salvarGerente(Gerente gerente) {
        return gerenteRepo.save(gerente);
    }

    public void removerGerente(String cpf) {
        Gerente gerente = gerenteRepo.findByCpf(cpf).orElseThrow();
        gerenteRepo.delete(gerente);
    }

    // ------------------ CLIENTES ------------------

    public Cliente aprovarCliente(String cpfCliente, String cpfGerente) {
        Cliente cliente = clienteRepo.findByCpf(cpfCliente).orElseThrow();
        cliente.setConta(String.valueOf((int)(Math.random() * 9000 + 1000)));
        cliente.setSenha(UUID.randomUUID().toString().substring(0, 8));
        cliente.setLimite(cliente.getSalario() >= 2000 ? cliente.getSalario() / 2 : 0);
        cliente.setEstado("Aprovado");
        cliente.setCpfGerente(cpfGerente);
        System.out.println("📧 Enviando e-mail para " + cliente.getEmail() + " com senha: " + cliente.getSenha());
        return clienteRepo.save(cliente);
    }

    public Cliente rejeitarCliente(String cpfCliente, String motivo) {
        Cliente cliente = clienteRepo.findByCpf(cpfCliente).orElseThrow();
        cliente.setEstado("Rejeitado");
        cliente.setMotivoRecusa(motivo);
        System.out.println("📧 Enviando e-mail para " + cliente.getEmail() + " com o motivo: " + motivo);
        return clienteRepo.save(cliente);
    }

    public List<Cliente> listarPendentesPorGerente(String cpfGerente) {
        return clienteRepo.findByEstado("Pendente").stream()
                .filter(c -> cpfGerente.equals(c.getCpfGerente()))
                .collect(Collectors.toList());
    }

    public List<Cliente> consultar3MelhoresClientes(String cpfGerente) {
        return clienteRepo.findByCpfGerente(cpfGerente).stream()
                .filter(c -> "Aprovado".equals(c.getEstado()))
                .sorted(Comparator.comparingDouble(Cliente::getSaldo).reversed())
                .limit(3)
                .collect(Collectors.toList());
    }

    // ------------------ TRANSFERÊNCIAS ------------------

    public Optional<Cliente> adicionarGerenteComTransferencia(Gerente novoGerente) {
        List<Gerente> gerentes = gerenteRepo.findAll();
        if (gerentes.isEmpty()) {
            gerenteRepo.save(novoGerente);
            return Optional.empty();
        }

        Map<String, List<Cliente>> mapaClientes = new HashMap<>();
        for (Gerente g : gerentes) {
            mapaClientes.put(g.getCpf(), clienteRepo.findByCpfGerente(g.getCpf()));
        }

        int maxContas = mapaClientes.values().stream().mapToInt(List::size).max().orElse(0);
        if (maxContas == 0) {
            gerenteRepo.save(novoGerente);
            return Optional.empty();
        }

        Gerente escolhido = gerentes.stream()
                .filter(g -> mapaClientes.get(g.getCpf()).size() == maxContas)
                .min(Comparator.comparingDouble(g ->
                        mapaClientes.get(g.getCpf()).stream()
                                .mapToDouble(c -> Math.max(0, c.getSaldo()))
                                .sum()))
                .orElseThrow();

        List<Cliente> clientesEscolhido = mapaClientes.get(escolhido.getCpf());
        if (clientesEscolhido.isEmpty()) {
            gerenteRepo.save(novoGerente);
            return Optional.empty();
        }

        clientesEscolhido.sort(Comparator.comparingDouble(Cliente::getSaldo));
        Cliente transferido = clientesEscolhido.get(0);
        transferido.setCpfGerente(novoGerente.getCpf());
        clienteRepo.save(transferido);

        gerenteRepo.save(novoGerente);
        return Optional.of(transferido);
    }

    public boolean removerGerente(String cpfRemovido, String cpfDestinatario) {
        List<Gerente> gerentes = gerenteRepo.findAll();
        if (gerentes.size() <= 1) throw new IllegalStateException("Não é possível remover o último gerente!");

        List<Cliente> clientesRemovido = clienteRepo.findByCpfGerente(cpfRemovido);
        for (Cliente c : clientesRemovido) {
            c.setCpfGerente(cpfDestinatario);
            clienteRepo.save(c);
        }

        gerenteRepo.findByCpf(cpfRemovido).ifPresent(gerenteRepo::delete);
        return true;
    }
}