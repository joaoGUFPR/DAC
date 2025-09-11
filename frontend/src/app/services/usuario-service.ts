import { Injectable } from '@angular/core';

const LS_CHAVE = "usuarios";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor() { }
  
  public listarTodos(): any[] {
    const usuarios = localStorage.getItem(LS_CHAVE);
    return usuarios ? JSON.parse(usuarios) : [];
  }

  public salvar (usuario: any): void {
    const usuarios = this.listarTodos();
    usuarios.push(usuario);
    localStorage.setItem(LS_CHAVE, JSON.stringify(usuarios));
  }

  public inicializarUsuarios(): void {
      // Se não houver usuários, cria os usuários padrão
    if (this.listarTodos().length === 0) {
      // Cliente Padrão (pode vir do autocadastro)
      this.salvar({ email: 'cliente@email.com', senha: 'tads', papel: 'cliente' });
      // Gerente Padrão
      this.salvar({ email: 'gerente@email.com', senha: 'tads', papel: 'gerente' });
      // Admin Padrão
      this.salvar({ email: 'admin@email.com', senha: 'tads', papel: 'admin' });
    }
  }
}