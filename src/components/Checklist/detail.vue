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
                <span class="font-bold text-gray-700 text-lg">Reservas</span>
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
                  >Room</label>
                  <select
                    id="exampleFormControlInput1"
                    class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  >
                    <option value="CSB100">CSB100</option>
                    <option value="CSB201">CSB201</option>
                    <option value="CSB207">CSB207</option>
                    <option value="CSB209">CSB209</option>
                    <option value="CSB210">CSB210</option>
                    <option value="CSB309">CSB309</option>
                    <option value="CSB310">CSB310</option>
                  </select>
                </div>
  
                <div class="mb-4">
                  <label
                    for="exampleFormControlInput1"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >Instructor :</label>
                  <!-- Buscador way -->
                  <div class="flex flex-col relative">
                    <div class="w-full">
                      <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <div class="flex flex-auto flex-wrap"></div>
                        <input
                          placeholder="Teacher's name ..."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
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
                  >Phone number :</label>
                  <input
                    type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput1"
                    placeholder="Phone number ..."
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="exampleFormControlInput1"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >Description :</label>
                  <input
                    type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput1"
                    placeholder="Description ..."
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="exampleFormControlInput1"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >Date :</label>
                  <input
                    disabled="true"
                    type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput1"
                    placeholder="Enter pass"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="exampleFormControlInput2"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >Time-start :</label>
                  <input
                    type="time"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput2"
                  />
                  <!-- type="time" -->
                </div>
                <!-- start select -->
                <div class="mb-4">
                  <label
                    for="exampleFormControlInput2"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >Time-end :</label>
                  <input 
                    type="time"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput2"
                  />
                  <!-- type="time" -->
                </div>
                <!-- end select -->
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="inline-flex justify-center w-full border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline"
              >Confrim</button>
  
              <button
                type="button"
                class="inline-flex justify-center w-full border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              >cancle</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "Modal",
    props:{
      form:{
        type: Object,
        default: ()=>{}
      }
    },
    components: {
    },
    
    methods:{
    //   closeModal(){
    //     this.$emit('closeModal')
    //   },
    //   store(form){
    //     this.$emit('saveAppt',form)
    //   }
    }
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