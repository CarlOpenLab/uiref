<template>
  <div class="w-full max-w-xl space-y-4">
    <UAlert title="已保存" tone="success">
      你的修改已同步到云端，所有协作者都能看到最新版本。
    </UAlert>
    <UAlert title="存储空间不足" tone="warning">
      空间即将用完，<a href="#" class="font-medium underline">升级套餐</a>可获得 1TB 容量。
    </UAlert>
    <UAlert title="发布失败" tone="danger">
      构建过程返回错误码 137，请检查构建日志后重试。
    </UAlert>
    <UAlert tone="info">
      无标题用法：只有正文时直接传内容即可，适合轻提示。
    </UAlert>
  </div>
</template>
