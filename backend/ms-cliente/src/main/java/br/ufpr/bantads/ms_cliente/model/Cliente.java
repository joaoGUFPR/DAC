package main.java.br.ufpr.bantads.ms_cliente.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.Data;
import java.math.BigDecimal;


@Entity // Anotação que diz ao Spring:"Esta classe é uma tabela no banco"
@Data // Anotação que gera automaticamente os métodos getters, setters, toString, equals e hashCode
public class Cliente {
    // chave primária
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Pede ao banco para gerar os IDs automaticamente
    private Long id;
    
    private String cpf;
    private String nome;
    private String email;
    private String telefone;
    private BigDecimal salario;
    private String endereco;
    private String cep;
    private String complemento;
    private String numero;
}
