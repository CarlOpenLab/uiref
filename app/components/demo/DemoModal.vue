<script setup lang="ts">
const basic = ref(false)
const confirm = ref(false)
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-3">
      <UButton variant="outline" @click="basic = true">打开对话框</UButton>
      <UButton variant="danger" @click="confirm = true">打开确认框</UButton>
    </div>

    <UModal v-model="basic" title="对话框标题">
      <p>这里是模态框正文。点击遮罩或右上角关闭按钮即可退出，也可以在底部操作区放按钮。</p>
    </UModal>

    <UModal v-model="confirm" title="确认删除">
      <p>删除后不可恢复，确定要继续吗？</p>
      <template #footer>
        <UButton variant="ghost" @click="confirm = false">取消</UButton>
        <UButton variant="danger" @click="confirm = false">确认删除</UButton>
      </template>
    </UModal>
  </div>
</template>
