<script setup>
import { ref } from 'vue';
import { adicionarProduto as adicionarProdutoAPI } from '../../../../services/api';
// Notificacoes maneiras
import { useToast } from 'vue-toastification';
const toast = useToast();

const emit = defineEmits(['produtoAdicionado']);

const produto = ref({
  referencia: '',
  descricao: '',
  categoria: '',
  preco: 0,
  status: false,
  image: '',
  usuarioId: 0 // Inicialmente 0, será atualizado
});

async function adicionaProduto() {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Usuário não autenticado.');

    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) throw new Error('Usuário não autenticado.');
    produto.value.usuarioId = parseInt(usuarioId, 10);

    const novoProduto = await adicionarProdutoAPI(produto.value, token);

    produto.value = {
      referencia: '',
      descricao: '',
      categoria: '',
      preco: 0,
      status: false,
      image: '',
      usuarioId: 0
    };

    // Fecha o modal e atualiza a lista de produtos
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();
    emit('produtoAdicionado');
    toast.success('Produto cadastrado com sucesso!');
  } catch (erro) {
    toast.error('Erro ao cadastrar produto.');
  }
}
</script>

<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">Cadastrar Produto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="adicionaProduto">
            <div class="mb-3">
              <label for="referencia" class="form-label">Referência:</label>
              <input type="text" class="form-control" id="referencia" v-model="produto.referencia" required>
            </div>
            <div class="mb-3">
              <label for="descricao" class="form-label">Descrição:</label>
              <input type="text" class="form-control" id="descricao" v-model="produto.descricao" required>
            </div>
            <div class="mb-3">
              <label for="categoria" class="form-label">Categoria:</label>
              <input type="text" class="form-control" id="categoria" v-model="produto.categoria" required>
            </div>
            <div class="mb-3">
              <label for="preco" class="form-label">Preço:</label>
              <input type="number" class="form-control" id="preco" v-model.number="produto.preco" step="0.01" required>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="status" v-model="produto.status">
              <label class="form-check-label" for="status">Ativo</label>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Imagem:</label>
              <input type="text" class="form-control" id="image" v-model="produto.image">
            </div>
            <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  margin-top: 15vh;
}
</style>
