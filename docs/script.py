from browser import document, window

def calcular(event):
    # Mensagem de depuração para confirmar que a função foi chamada
    print("Botão Calcular clicado!")
    
    # Tenta obter os valores dos campos de entrada
    try:
        valor_produto = float(document["valor_produto"].value)
        quantidade = int(document["quantidade"].value)
    except ValueError:
        window.alert("Por favor, insira valores válidos.")
        return

    if valor_produto <= 0 or quantidade <= 0:
        window.alert("Por favor, insira valores válidos.")
        return

    print(f"Valor produto: {valor_produto}, Quantidade: {quantidade}")

    # Calcula o valor total sem desconto
    valor_total = valor_produto * quantidade

    # Define o desconto de acordo com a quantidade
    desconto = 0
    if 10 <= quantidade <= 99:
        desconto = 0.05  # 5%
    elif 100 <= quantidade <= 999:
        desconto = 0.10  # 10%
    elif quantidade >= 1000:
        desconto = 0.15  # 15%

    # Calcula o valor com desconto
    valor_com_desconto = valor_total - (valor_total * desconto)
    
    print(f"Valor total: {valor_total}, Desconto: {desconto}, Valor com desconto: {valor_com_desconto}")
    
    # Verifica o conteúdo do elemento com data-i18n="result" para detectar o idioma atual.
    # Se o texto for "Result:", consideramos inglês; se for "Resultado:" (ou qualquer outra coisa), usamos português.
    lang_text = document.querySelector('[data-i18n="result"]').text.strip()
    print("Texto do elemento 'result':", lang_text)
    
    if lang_text == "Result:":
        # Atualiza os resultados em inglês
        document["valor_total"].text = f"Total value: R$ {valor_total:.2f}"
        document["valor_com_desconto"].text = f"Discounted value: R$ {valor_com_desconto:.2f}"
        document["desconto"].text = f"Discount: {desconto * 100}%"
        print("Atualizado em inglês.")
    else:
        # Atualiza os resultados em português
        document["valor_total"].text = f"Valor total: R$ {valor_total:.2f}"
        document["valor_com_desconto"].text = f"Valor com desconto: R$ {valor_com_desconto:.2f}"
        document["desconto"].text = f"Desconto: {desconto * 100}%"
        print("Atualizado em português.")

# Associa a função de cálculo ao botão "Calcular"
document["calcular-btn"].bind("click", calcular)
