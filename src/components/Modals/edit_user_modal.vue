<template>
  <div class="fixed z-10 inset-0 overflow-y-auto ease-out duration-400">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>​
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form>
          <div class="flex justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <i class="fas fa-exclamation-circle text-blue-500"></i>
              <span class="font-bold text-gray-700 text-lg">Edit reservation</span>
            </div>
            <div>
              <button>
                <i
                  class="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"
                ></i>
              </button>
            </div>
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class>
              <div class="col-span-6 sm:col-span-3 mb-4">
                <label
                  for="exampleFormControlInput1"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >Room :</label
                >
                <select
                  v-model="form.room_refer"
                  id="exampleFormControlInput1"
                  class=" text-slate-800 mt-1 block form-select w-full py-3 px-3 border border-gray-200  rounded-2xl shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  <option value="CSB100">CSB100</option>
                  <option value="CSB201">CSB201</option>
                  <option value="CSB202">CSB202</option>
                  <option value="CSB203">CSB203</option>
                  <option value="CSB207">CSB207</option>
                  <option value="CSB209">CSB209</option>
                  <option value="CSB210">CSB210</option>
                  <option value="CSB301">CSB301</option>
                  <option value="CSB303">CSB303</option>
                  <option value="CSB307">CSB307</option>
                  <option value="CSB308">CSB308</option>
                  <option value="CSB309">CSB309</option>
                  <option value="CSB310">CSB310</option>
                </select>
              </div>

              <div class="mb-4">
                <label
                  for="exampleFormControlInput1"
                  class="block text-gray-700 text-sm font-bold"
                  >Instructor :</label
                >
                <!-- Buscador way -->
                <div class="flex flex-col relative">
                  <div class="w-full">
                    <div
                      class="my-2 p-1 py-1 flex border border-gray-200  rounded-2xl shadow-sm"
                    >
                      <div class="flex flex-auto flex-wrap"></div>
                      <input
                        v-model="form.course_instructor"
                        placeholder="Instructor's name ..."
                        class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                      />
                    </div>
                  </div>
                  <!-- Options select -->
                  <div
                    class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
                  >
                    <!-- partial component -->
                  </div>
                  <!-- end Options -->
                </div>
                <!-- comienzo input -->
              </div>
              <!-- end Buscador -->
              <div class="mb-4">
                <label
                  for="exampleFormControlInput1"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >Description :</label
                >
                <input
                  v-model="form.description"
                  type="text"
                  class="appearance-none border w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  rounded-2xl shadow-sm py-3"
                  id="exampleFormControlInput1"
                  placeholder="Description ..."
                  autocomplete="off"
                />
              </div>
              <div class="mb-4">
                <label
                  for="exampleFormControlInput1"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >Date :</label
                >
                <input
                  v-model="form.start_date"
                  disabled
                  type="text"
                  class="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 rounded-2xl shadow-sm"
                  id="exampleFormControlInput1"
                  placeholder="Enter pass"
                />
              </div>
              <div class="flex flex-wrap gap-x-4">
                <div class="mb-4 w-full md:w-5/12">
                  <label
                    for="exampleFormControlInput2"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >Start at :</label
                  >
                  <input
                    v-model="form.start_time"
                    disabled
                    type="time"
                    class="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100  rounded-2xl shadow-sm"
                    id="exampleFormControlInput2"
                  />
                  <!-- type="time" -->
                </div>
                <!-- start select -->
                <div class="mb-4 w-full md:w-5/12">
                  <label
                    for="exampleFormControlInput2"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >End at :</label
                  >
                  <input
                    v-model="form.end_time"
                    disabled
                    type="time"
                    class="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 rounded-2xl shadow-sm"
                    id="exampleFormControlInput2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click.prevent="store(form)"
              type="button"
              class="inline-flex justify-center w-full border border-green-500 bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease-in select-none focus:outline-none focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>

              <p class="px-1">Save</p>
            </button>

            <button
              @click.prevent="closeModal"
              type="button"
              class="inline-flex justify-center w-full border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease-in select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="px-1">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  components: {},

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    store(form) {
      this.$emit("saveEdit", form);
    },
  },
};
</script>

<style scoped>
.top-100 {
  top: 100%;
}

.bottom-100 {
  bottom: 100%;
}

.max-h-select {
  max-height: 300px;
}
</style>
