<template>
  <div class="fixed z-10 inset-0 overflow-y-auto ease-out duration-400">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
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
              <span class="font-bold text-gray-700 text-lg"
                >Create course</span
              >
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
            <p class="text-red-700 text-center">
              For class with multiple rooms, create course <br/>
              for each room separately.
            </p>
            <div class>
              <div class="flex flex-wrap gap-x-4 justify-center">
                <div class="col-span-6 sm:col-span-3 mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >Room :</label
                  >
                  <select
                    v-model="form.room_refer"
                    class=" rounded-2xl shadow-sm py-3 mt-1 block form-select w-full px-3 border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                <div
                  class="flex items-center space-x-6 my-5 mb-4 w-full md:w-5/12"
                >
                  <div class="flex items-center">
                    <input
                      value="Lecture"
                      v-model="form.course_type"
                      type="radio"
                      name="radio1"
                      id="radioButton1"
                      class="h-5 w-5"
                    />
                    <label class="pl-3 text-base font-medium text-[#07074D]">
                      Lecture
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      value="Lab"
                      v-model="form.course_type"
                      type="radio"
                      name="radio1"
                      id="radioButton2"
                      class="h-5 w-5"
                    />
                    <label class="pl-3 text-base font-medium text-[#07074D]">
                      Lab
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-4 justify-center">
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Course ID :</label
                  >
                  <div class="flex flex-col relative">
                    <div class="w-full">
                      <div
                        class="my-2 p-1 flex border border-gray-200 rounded-2xl"
                      >
                        <div class="flex flex-auto flex-wrap"></div>
                        <input
                          v-model="form.course_id"
                          type="number"
                          placeholder="204..."
                          class="px-2 appearance-none outline-none w-full text-gray-800  py-2"
                        />
                      </div>
                    </div>
                    <div
                      class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
                    ></div>
                  </div>
                </div>
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Course Name :</label
                  >
                  <div class="flex flex-col relative">
                    <div class="w-full">
                      <div
                        class="my-2 p-1  flex border border-gray-200 rounded-2xl"
                      >
                        <div class="flex flex-auto flex-wrap"></div>
                        <input
                          v-model="form.course_name"
                          type="text"
                          placeholder="Course "
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800  py-2"
                        />
                      </div>
                    </div>
                    <div
                      class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-x-4 justify-center">
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold">
                    Section :</label
                  >
                  <div class="flex flex-col relative">
                    <div class="w-full">
                      <div
                        class="my-2 p-1  flex border border-gray-200 rounded-2xl"
                      >
                        <div class="flex flex-auto flex-wrap"></div>
                        <input
                          v-model="form.course_section"
                          type="number"
                          placeholder="1, 2, ..."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800  py-2"
                        />
                      </div>
                    </div>
                    <div
                      class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
                    ></div>
                  </div>
                </div>
                <div class="w-full md:w-5/12 mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >Days Of Week :</label
                  >
                  <select
                    v-model="form.day_of_week"
                    class=" rounded-2xl shadow-sm py-3 mt-1 block form-select w-full px-3 border border-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  >
                    <option value="1">Mon</option>
                    <option value="2">Tue</option>
                    <option value="3">Wed</option>
                    <option value="4">Thu</option>
                    <option value="5">Fri</option>
                    <option value="1,4">Mon-Thu</option>
                    <option value="2,5">Tue-Fri</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-wrap gap-x-4 justify-center">
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Instructor :</label
                  >
                  <div class="flex flex-col relative">
                    <div class="w-full">
                      <div
                        class="my-2 p-1  flex border border-gray-200 rounded-2xl shadow-sm py-2"
                      >
                        <div class="flex flex-auto flex-wrap"></div>
                        <input
                          v-model="form.course_instructor"
                          type="text"
                          placeholder="Name"
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                        />
                      </div>
                    </div>
                    <div
                      class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
                    ></div>
                  </div>
                </div>
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Instructor's Email :</label
                  >
                  <div class="flex flex-col relative">
                    <div class="w-full">
                      <div
                        class="my-2 p-1  flex border border-gray-200 rounded-2xl shadow-sm py-2"
                      >
                        <div class="flex flex-auto flex-wrap"></div>
                        <input
                          v-model="form.course_instructor_email"
                          type="email"
                          placeholder="Email"
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                        />
                      </div>
                    </div>
                    <div
                      class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-4 justify-center">
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >Start date :</label
                  >
                  <input
                    v-model="form.start_date"
                    type="date"
                    class="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  rounded-2xl shadow-sm"
                  />
                </div>
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >End date :</label
                  >
                  <input
                    v-model="form.end_date"
                    type="date"
                    class="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  rounded-2xl shadow-sm"
                  />
                </div>
              </div>
              <div class="flex flex-wrap gap-x-4 justify-center">
                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >Class start at :</label
                  >
                  <input
                    v-model="form.start_time"
                    type="time"
                    class="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  rounded-2xl shadow-sm"
                  />
                </div>

                <div class="mb-4 w-full md:w-5/12">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >Class end at :</label
                  >
                  <input
                    v-model="form.end_time"
                    type="time"
                    class="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  rounded-2xl shadow-sm"
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
              Confirm
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
      this.$emit("saveAppt", form);
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
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Safari */
  margin: 0; /* Removes the default margin */
}
</style>
