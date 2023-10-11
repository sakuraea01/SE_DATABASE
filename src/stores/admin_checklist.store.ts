import { defineStore } from "pinia";
import { watchEffect, ref, defineComponent } from "vue";
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const admin_checklist  = defineStore("checklist", {
  state: () => ({ 
    data : ref([]),
    max_obj : ref(0),
    user_name : ref([]),
    Open_detail: ref(false),
    count: ref(10),
    number: ref(1),
  }),
  actions: {
    increment() {
      this.count +=10;
      this.number += 10;
    },

  },
});
