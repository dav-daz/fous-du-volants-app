<script setup>
  import { useToolsStore } from "@/store/tools.js";
  
  //On importe storeToRefs pour écouter les changements
  import { storeToRefs } from "pinia";

  const toolsStore = useToolsStore();

  //Sert à détecter les changements du store toolsStore défini au-dessus
  const { showModal } = storeToRefs(toolsStore);
</script>

<template>
  <Teleport to="body">
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</Teleport>
</template>

<style lang="scss">
.modal {
  &-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.05s ease;
  }

  &-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &-container {
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--modale-background);
    color: var(--text);
    border-radius: $border-radius-4;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.5s ease;
  }

  &-title {
    font-size: 1.9rem;
    margin: 0 0 1.5rem 0;
  }

  &-text {
    font-size: 1.4rem;
    line-height: 1.3;
  }

  &-header {
    text-align: right;

    h3 {
      margin-top: 0;
      margin-bottom: 50px;
      text-align: center;
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    margin-top: 4rem;
  }

  &-default-button {
    &.reset {
      color: red;
    }
  }

  &-btn {
  @extend .btn-icon;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text);
  padding: 0.8rem;
}
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>