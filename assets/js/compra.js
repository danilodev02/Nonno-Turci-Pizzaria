document.addEventListener('DOMContentLoaded', function() {
    Carrinho();
    Produtos();
    CalcularCusto();
    FinalizarCompra()
});



function Carrinho() {
    const listCar = document.querySelector('#list-car');
    if (!listCar) return;

    if (listCar.children.length === 0) {
        listCar.innerHTML = "Nenhum pedido";
    } 
}

function Produtos() {
    const botoesAdicionar = document.querySelectorAll('#button-adicionar');
    const listCar = document.querySelector('#list-car');
    if (!listCar) return;

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function(){
            const produto = this.closest('.produto');
            if (!produto) return;

            const imagem = produto.querySelector('img')?.src || '';
            const nome = produto.querySelector('h4')?.textContent?.trim() || '';
            const preco = produto.querySelector('.preco-comprar p')?.textContent?.trim() || 'R$ 0,00';

            if (listCar.innerHTML.trim() === "Nenhum pedido") {
                listCar.innerHTML = '';
            }

            const itemCarrinho = document.createElement('div');
            itemCarrinho.classList.add('item-carrinho');
            itemCarrinho.innerHTML = `
                <img src="${imagem}" alt="${nome}">
                <div>
                    <h5>${nome}</h5>
                    <p class="preco-item">${preco}</p>
                </div>
                <button type="button" class="btn-excluir">Excluir</button>
            `;

            listCar.appendChild(itemCarrinho);

            ExcluirDoCarrinho(itemCarrinho, listCar);
            CalcularCusto();
        });
    });

    CalcularCusto();
}

function ExcluirDoCarrinho(itemCarrinho, listCar) {
    const btnExcluir = itemCarrinho.querySelector('.btn-excluir');
    if (!btnExcluir) return;

    btnExcluir.addEventListener('click', function() {
        itemCarrinho.remove();

        if (listCar.children.length === 0) {
            listCar.innerHTML = "Nenhum pedido";
        }

        CalcularCusto();
    });
}

function CalcularCusto() {
    const listCar = document.querySelector('#list-car');
    if (!listCar) return;

    const itens = listCar.querySelectorAll('.item-carrinho');
    let total = 0;

    itens.forEach(item => {
        const precoElem = item.querySelector('.preco-item');
        if (!precoElem) return;
        const precoText = precoElem.textContent || '';
        const valor = parseFloat(precoText.replace(/[^\d,.-]/g, '').replace(',', '.'));
        if (!isNaN(valor)) total += valor;
    });

    const totalElement = document.querySelector('#total-carrinho');
    if (totalElement) {
        const formatted = total.toFixed(2).replace('.', ',');
        totalElement.textContent = `R$ ${formatted}`; 
    }
}

function FinalizarCompra() {
    const btn = document.querySelector('#finalizar');
    if (!btn) return;

    btn.addEventListener('click', function(e) {
        const listCar = document.querySelector('#list-car');

        if (listCar.children.length === 0) {
            alert("Nenhum pedido. Por favor adicione nossas pizzas apertando no botão de adicionar!")
        } else {
            alert("Obrigado por pedir na Nonno Turci! Aproveite! :D")
            listCar.innerHTML = "Nenhum pedido";

            const totalElement = document.querySelector('#total-carrinho');
            if (totalElement) totalElement.textContent = 'R$ 0,00';
        }   
    });
}