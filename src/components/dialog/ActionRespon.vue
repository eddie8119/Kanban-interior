<template>
  <div class="dialog-mask" @click.self="$emit('closeAlert')">
    <div class="dialog-container max-w-[502px] w-full">
      <div class="close-wrap-custom" @click="$emit('closeAlert')">
        <div class="close"></div>
      </div>
      <div class="flex flex-col items-center justify-center gap-y-3 p-6">
        <div>
          <img class="w-[56px] h-[56px]" :src="imageChoice" alt="" />
        </div>
        <p :class="[dialogData.action ? 'text-green-400' : 'text-funsugarMain']">
          {{ dialogData.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionRespon",
  props: ["dialogData"],
  data() {
    return {};
  },
  computed: {
    imageChoice() {
      return this.dialogData.action
        ? require("@/assets/img/ActionResponse/success.png")
        : require("@/assets/img/ActionResponse/fail.png");
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/dialog.scss";
.close-wrap-custom {
  @apply absolute right-3 top-6 -translate-y-1/2;
  .close {
    @apply relative cursor-pointer w-[30px] h-[30px] z-[1] rounded-[50%];
    &:after {
      content: "";
      position: absolute;
      border: 1px solid #9f9f9f;
      height: 20px;
      border-radius: 100px;
      top: 50%;
      right: 50%;
      transform: translateY(-50%) translateX(50%) rotate(45deg);
    }
    &:before {
      content: "";
      position: absolute;
      border: 1px solid #9f9f9f;
      height: 20px;
      border-radius: 100px;
      top: 50%;
      right: 50%;
      transform: translateY(-50%) translateX(50%) rotate(-45deg);
    }
  }
}
</style>