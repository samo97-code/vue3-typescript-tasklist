<template>
  <transition name="snackbar" class="custom-snackbar">
    <div v-if="active" class="snackbar text-m" :class="classes">
      <div class="snackbar__wrap">
        <div class="snackbar__body body-custom">
          <span v-if="typeof message === 'string'">{{ message }}</span>
          <ul v-else class="errors-list">
            <li v-for="(item, index) in message" :key="index">◦ {{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent, ref, computed, watch} from "vue";
import {useStore} from "vuex";


export default defineComponent({
  name: "SnackBar",
  props: {
    type: {
      type: String,
      required: true,
      default: "message",
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    message: {
      type: [ String, Number ],
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
      default: "default",
    },
    position: {
      type: String,
      required: true,
      default: "top-right",
    },
  },

  setup(props) {
    const store = useStore()
    const timer = ref()

    console.log(props.position,'props')

    //Computed
    const classes = computed(()=>{
      return {
        [`snackbar--${props.position}`]: true,
        [`snackbar--${props.backgroundColor}`]: true,
        [`snackbar--text-color-${props.backgroundColor}`]: true,
      };
    },)

    //Watch
    watch(()=>props.active,()=>{
        setTimer()
    })

    const setTimer = () => {
      if (timer.value) clearTimeout(timer.value);

      timer.value = setTimeout(() => {
        store.commit("setSnackbar", {
          show: false,
          message: "",
          color: "success",
        });
      }, props.timeout);
    }

    return {timer, setTimer, classes}
  },
})
</script>

<style lang="scss" scoped>
@import "../assets/scss/snackbar";
</style>
