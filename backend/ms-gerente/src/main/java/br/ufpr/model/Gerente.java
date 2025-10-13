package br.ufpr.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity // Anotação que diz ao Spring:"Esta classe é uma tabela no banco"
@Data // Anotação que gera automaticamente os métodos getters, setters, toString, equals e hashCode

public class Gerente {
    @Id // chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Pede ao banco para gerar os IDs automaticamente
    private Long id;

    private String cpf;
    private String nome;
    private String email;
    private String telefone;
}