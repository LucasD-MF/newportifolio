from browser import document, window

# Dicionário para armazenar itens do carrinho
carrinho = []
total = 0

# Função para adicionar item no carrinho
def adicionarItem(codigo, valor):
    global carrinho, total

    # Pergunta quantas unidades o usuário deseja
    quantidade = window.prompt("Quantas unidades?", "1")
    
    try:
        quantidade = int(quantidade)
        if quantidade <= 0:
            window.alert("Digite um valor válido (mínimo 1)")
            return

        # Adiciona o item ao carrinho
        carrinho.append({"codigo": codigo, "valor": valor, "quantidade": quantidade})
        
        # Atualiza o carrinho na página
        atualizarCarrinho()

    except ValueError:
        window.alert("Por favor, insira um número válido para a quantidade.")

# Função para atualizar o carrinho na interface
def atualizarCarrinho():
    global carrinho, total
    total = 0
    lista_itens = document["itens_carrinho"]
    lista_itens.clear()

    # Adiciona cada item ao carrinho
    for item in carrinho:
        item_total = item["valor"] * item["quantidade"]
        total += item_total
        lista_itens <= f"<li>{item['quantidade']} x Código {item['codigo']} - {item['valor']}$ (Total: {item_total:.2f}$)</li>"

    # Atualiza o total
    document["total"].text = f"{total:.2f}"

# Função para finalizar o pedido
def finalizarPedido():
    global total
    window.alert(f"Pedido finalizado! Total a pagar: ${total:.2f}")
    carrinho.clear()
    atualizarCarrinho()
