<template>
  <div ref="editorContainer" class="code-editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor';
import { onMounted, ref, watch } from 'vue';

export default {
  name: 'CodeEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const editorContainer = ref(null);
    let editor = null;

    onMounted(() => {
      editor = monaco.editor.create(editorContainer.value, {
        value: props.modelValue,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
      });

      // Слушаем изменения в редакторе
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        emit('update:modelValue', value); // Обновляем v-model
      });
    });

    // Следим за изменениями в modelValue и обновляем редактор
    watch(
        () => props.modelValue,
        (newValue) => {
          if (editor && editor.getValue() !== newValue) {
            editor.setValue(newValue);
          }
        }
    );

    return {
      editorContainer,
    };
  },
};
</script>

<style scoped>
.code-editor {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  text-align: left;
}
</style>
