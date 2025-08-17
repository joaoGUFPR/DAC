<h1>Diagrama de casos de uso</h1>
<div>
<p>Diagrama de casos de uso de acordo com os requisitos especificados.</p>
<p>Foi utilizado o 
  <a href="https://www.plantuml.com/">PlantUml</a> para desenhar o diagrama.
</p>
<ul>
  <li>Administrador</li>
  <li>Cliente</li>
  <li>Gerente</li>
</ul>
</div>
<div>
<p styles="bold">
  <strong>Versão simplificada</strong>
</p>  
  <img width="437" height="1548" alt="image" src="https://github.com/user-attachments/assets/bbd2c046-0e35-4a60-9133-4a31e0585e27" />
<p>
  <strong>Vesão detalhada</strong>
</p>
  
  <img width="1095" height="1612" alt="image" src="https://github.com/user-attachments/assets/6a662185-a4ce-4b82-b10c-8a9ef1c9b872" />
</div>

<div class="diagramaDeClasses">
  <h1>Diagrama de Classes</h1>
  <p>
    <img width="762" height="1115" alt="image" src="https://github.com/user-attachments/assets/40e9b01b-1981-4291-b292-ed755448105e" />
  </p>  
  <p>** Vericar as particulariedades das consultas no GerenteService</p> 
</div>

<div class="diagramaDeSequencia">
  <h1>Diagrama de Sequência -> Cliente Autocadastro</h1>
  <p>Sequência:</p>
  <ul>
    <li>Cliente faz o autocadastro via página inicial (sem login).</li>
    <li>O sistema envia a solicitação para o MS Cliente.</li>
    <li>O MS Cliente cria um registro do cliente em estado "pendente".</li>
    <li>O MS Cliente aciona o MS Gerente para escolher automaticamente o gerente com menos clientes.</li>
    <li>O MS Autenticação cria um registro de login (sem liberar senha ainda).</li>
    <li>O MS Conta prepara a conta (mas só é ativada após aprovação do gerente).</li>
    <li>O sistema retorna uma mensagem “solicitação enviada”.</li>
    <li>Se houver falha, envia e-mail de erro.</li>
  </ul>
  <p>
    <img width="1446" height="620" alt="image" src="https://github.com/user-attachments/assets/25847d2b-1627-4ce7-857a-740d96c88969" />
  </p>
</div>

<div class="diagramaDeSequencia">
  <h1>Diagrama de Sequência -> Gerente aprova Cliente</h1>
  <p>Sequência:</p>
  <ul>
    <li>O Gerente acessa sua tela inicial (supondo que já está logado).</li>
    <li>Seleciona um cliente pendente e clica em Aprovar. (**visto que era o gerente com menos clientes)</li>
    O sistema gera:
    <li>Número da conta (4 dígitos aleatórios).</li>
    <li>Senha aleatória do cliente.</li>
    <li>O MS Conta cria a conta com limite baseado no salário (metade do salário).</li>
    <li>O MS Autenticação ativa o usuário e atualiza a senha.</li>
    <li>Um email é enviado ao cliente com a senha.</li>
    <li>O sistema confirma a aprovação ao Gerente.</li>
    <li>Se necessário envia notificação de erro</li>
  </ul>
  <p>
    <img width="1565" height="632" alt="image" src="https://github.com/user-attachments/assets/33d8a0ec-8eb0-4f4d-b765-9b87379796ff" />
  </p>
</div>

<div class="diagramaDeSequencia">
  <h1>Diagrama de Sequência -> Rejeitar Cliente</h1>
  <p>Sequência:</p>
  <ul>
    <li>O gerente seleciona um cliente pendente e clica em Rejeitar.</li>
    <li>O sistema solicita um motivo de rejeição.</li>
    <li>O MS Gerente registra a rejeição (com data/hora).</li>
    <li>O MS Cliente é atualizado para status "rejeitado".</li>
    <li>Um email é enviado ao cliente, informando o motivo da rejeição.</li>
    <li>O sistema confirma ao Gerente que a operação foi concluída.</li>
  </ul>
  <p>
    <img width="1475" height="472" alt="image" src="https://github.com/user-attachments/assets/4759773f-1d54-411e-ba68-6c8cffe6a6d5" />
  </p>
</div>

<div class="diagramaDeSequencia">
  <h1>Diagrama de Sequência -> Transferência</h1>
  <p>Sequência:</p>
  <ul>
    <li>Cliente solicita transferência.</li>
    <li>O sistema precisa validar saldo + limite.</li>  
    Se aprovado, registra duas movimentações:
    <li>Débito na conta de origem.</li>
    <li>Crédito na conta de destino.</li>
    <li>Usa padrão SAGA Orquestrada para garantir consistência entre contas.</li>
  </ul>
  <p>
    <img width="1379" height="848" alt="image" src="https://github.com/user-attachments/assets/8daec9bd-1e26-4089-bcd8-8fb5ed59f1ef" />
  </p>  
</div>
