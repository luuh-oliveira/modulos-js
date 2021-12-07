'use strict';

import { openModal, closeModal } from './modal.js';
import { getProdutos, postProduto, deleteProduto } from './produtos.js';
import { imagemPreview } from "./imagemPreview.js";

const criarLinhas = ({id, nome, preco, categoria, foto}) => {
    const linha = document.createElement('tr')
    linha.innerHTML = `
    <td>
        <img src="${foto}" class="produto-image" />
    </td>
    <td>${nome}</td>
    <td>${preco}</td>
    <td>${categoria}</td>
    <td>
        <button type="button" class="button green" data-idproduto="${id}">
            editar
        </button>
        <button type="button" class="button red" data-idproduto="${id}">
            excluir
        </button>
    </td>`;

    return linha;
};

//colocar async (chamando função com promessa)
const carregarTabela = async () => {

    const container = document.querySelector('.records tbody');
    const produtos = await getProdutos();
    const linhas = produtos.map(criarLinhas);
    container.replaceChildren(...linhas);

};

const handleFile = () => imagemPreview('inputFile', 'imagePreview')

const salvarProduto = () => {
    const produto = {
        nome: document.getElementById('product').value,
        preco: document.getElementById('price').value,
        categoria: document.getElementById('category').value,
        foto: document.getElementById('imagePreview').src,
    }

    postProduto(produto);
    closeModal();
    carregarTabela();

};


const handleClicktBody = ({target}) => {
    if (target.type === 'button') {
        const acaoBotao = target.textContent.trim();
        if (acaoBotao === 'excluir') {
            deleteProduto(target.dataset.idproduto);
            carregarTabela();
        }
    }
}

carregarTabela();


//eventos
document
    .getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('cancel').addEventListener('click', closeModal);

document.getElementById('inputFile').addEventListener('change', handleFile);

document.getElementById('save').addEventListener('click', salvarProduto);

document.querySelector('.records tbody').addEventListener('click', handleClicktBody)