<script>
import { watchEffect, ref, defineComponent } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import compoDetail from "../components/Modals/showDetail.vue";

export default {
  components: {
    compoDetail
  },
  setup() {
    const data = ref({id: null,
        user_refer: null,
        admin_refer: null,
        room_refer: null,
        course_id: null,
        course_section: null,
        course_name: null,
        course_type: null,
        course_instructor: null,
        course_instructor_email: null,
        day_of_week: null,
        description: null,
        start_time: null,
        end_time: null,
        date: null,
        end_date: null,
        type: null,
        status: null,});
    const max_obj = ref(0);
    const user_name = ref([]);
    const Open_detail = ref(false);
    const fitter = ref('Oldest')
    const number_test = ref(0)
    const dropdownOpen = ref(false);
    const showDetail = ref(false);
    const openDetail = (info) => {
      setnewEvent(info);
      showDetail.value = true;
    };
    const closeDetail = () => {
      showDetail.value = false;
    };
    const setnewEvent = (info) => {
      console.log("Data detail info : ", info);
      data.value.room_id = info.room_refer;
      data.value.email = info.email;
      data.value.name = info.name;
      data.value.date = info.start_date;
      data.value.instructor = info.course_instructor;
      data.value.description = info.description;
      data.value.time_start = info.start_time + " - " +info.end_time;
      data.value.status = info.status;
    };
    return {
      showDetail,
      openDetail,
      closeDetail,
      setnewEvent,
      Open_detail,
      fitter,
      number_test,
      count: ref(10),
      number: ref(1),
      dropdownOpen,
      data,
      set_detil: {},
    };
  },
  methods: {
    //Approve
    Approve: function (data) {
      console.log(data);
      Swal.fire({
        title: "Are you sure?",
        // text: "Do you want approval?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10B981",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("jwtToken");
          const token_id = ref(null);
          if (token) {
            const decodedToken = jwt_decode(token);
            token_id.value = decodedToken.id;
            this.token_id = decodedToken.id;
            console.log(token_id.value);
          }
          data.admin_refer = token_id.value;
          data.status = "Approved";
          axios
            .put(
              `http://localhost:3000/api/reservations/update/${data.id}`,
              data
            )
            .then((response) => {
              Swal.fire("Approved!", "Approved success.", "success");
              // setTimeout(() => {
              //   window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              // }, 1000);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    },
    //Refuse
    Refuse: function (data) {
      Swal.fire({
        title: "Are you sure?",
        // text: "Do you want to reject this?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("jwtToken");
          const token_id = ref(null);
          if (token) {
            const decodedToken = jwt_decode(token);
            token_id.value = decodedToken.id;
            this.token_id = decodedToken.id;
            console.log(token_id.value);
          }
          data.admin_refer = token_id.value;
          data.status = "Rejected";
          axios
            .put(
              `http://localhost:3000/api/reservations/update/${data.id}`,
              data
            )
            .then((response) => {
              Swal.fire("Refuse!", "req Refuse.", "success");
              // setTimeout(() => {
              //   window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              // }, 1000);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    },
    next_count: function () {
      this.count += 10;
      this.number += 10;
    },
    prevent_count: function () {
      this.count -= 10;
      this.number -= 10;
    },
    setModalOpen: function (obj) {
      this.Open_detail = true;
      if (obj.status === 'Waiting') {
        this.number_test += 1;
      }
      this.set_detil = obj;
      return;
    },
    closeModal: function () {
      this.Open_detail = false;
    },
    sory_by: function (by) {
      if (by === 'Oldest') {
        this.fitter = 'Oldest'
        this.data.sort((a, b) => a.id - b.id);
      } else if (by === "Rejected") {
        this.fitter = 'Rejected'
        this.data.sort((a, b) => {
          const statusOrder = { Rejected: 1, Approved: 2, Waiting: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
      } else if (by === "Waiting") {
        this.fitter = 'Waiting'
        this.data.sort((a, b) => {
          const statusOrder = { Waiting: 1, Rejected: 2, Approved: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
      } else if (by === "Approved") {
        this.fitter = 'Approved'
        this.data.sort((a, b) => {
          const statusOrder = { Approved: 1, Waiting: 2, Rejected: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
      } else if (by === "Latest") {
        this.fitter = 'Latest'
        this.data.sort((a, b) => b.id - a.id);
      }
    },
  },


  // GET API users , reservations
  async created() {
    try {
      const token = localStorage.getItem("jwtToken");
      const token_id = ref(null);
      if (token) {
        const decodedToken = jwt_decode(token);
        token_id.value = decodedToken.id;
        this.token_id = decodedToken.id;
        console.log(token_id.value);
      }
      const test = await axios.get("http://localhost:3000/api/users/list");
      let user;
      let users = {};
      for (var i = 0; i < test.data.length; i++) {
        user = test.data[i];
        users[user.id] = user;
      }
      const response = await axios.get(
        `http://localhost:3000/api/reservations/list/request`
      ); // ID
      console.log("response : ", response);
      this.data = response.data.map((eventnew) => ({
        admin_refer: eventnew.admin_refer,
        // course
        course_id: null, //null เพราะใช้กับ course
        course_section: null, //null เพราะใช้กับ course
        course_name: null, //null เพราะใช้กับ course
        course_type: null, //null เพราะใช้กับ course
        course_instructor_email: null, //null เพราะใช้กับ course
        day_of_week: null, //null เพราะใช้กับ courseฃ
        end_date: null, // ให้มันเป็น null ถ้าจะ add ธรรมดา string
        // end course
        id: eventnew.id,
        user_refer: eventnew.user_refer,
        room_refer: eventnew.room_refer,
        name:
          users[eventnew.user_refer].first_name +
          "  " +
          users[eventnew.user_refer].last_name,
        time: eventnew.start_time + "-" + eventnew.end_time,
        phone: users[eventnew.user_refer].phone,
        email: users[eventnew.user_refer].email,
        description: eventnew.description,
        course_instructor: eventnew.course_instructor,
        start_time: eventnew.start_time,
        end_time: eventnew.end_time,
        type: eventnew.type,
        start_date: eventnew.start_date,
        status: eventnew.status,
      }));
      this.data.sort((a, b) => a.id - b.id);
      this.max_obj = this.data.length;
      console.log("response : ", this.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  },
};
</script>

<template>
  <compoDetail v-if="showDetail" :setdetail="data" @closeDetail="closeDetail" />
  <div class="bg-transparent">
    <div class="flex items-center max-w-xl justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
          clip-rule="evenodd" />
      </svg>
      <p class="text-center text-3xl p-2 text-white">Check list</p>
    </div>
    <div class="flex flex-row-reverse text-white container md:w-10/12 mx-auto">

      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
        class="h-6 w-4 transform cursor-pointer my-auto text-white  transition-transform duration-200 ease-in-out"
        :class="dropdownOpen ? 'rotate-180' : 'rotate-0'" @click="dropdownOpen = !dropdownOpen">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
      <p class="flex "> Sort by :
      <p class="underline underline-offset-8 pl-2">{{ fitter }}</p>
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
</svg>
      <div v-show="dropdownOpen" class="fixed inset-0 z-10  h-full" @click="dropdownOpen = false"></div>

      <transition enter-active-class="transition duration-150 ease-out transform" enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100" leave-active-class="transition duration-150 ease-in transform"
        leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
        <div v-show="dropdownOpen" class="absolute right-20 z-20 w-48 py-3 mt-8 bg-white rounded-md shadow-xl">
          <button @click="sory_by('Oldest'), dropdownOpen = false"
            class="block px-4 py-3 text-sm w-full text-gray-700 hover:bg-indigo-600 hover:text-white">Oldest</button>
          <button @click="sory_by('Latest'), dropdownOpen = false"
            class="block px-4 py-3 text-sm w-full text-gray-700 hover:bg-indigo-600 hover:text-white">Latest</button>
          <button @click="sory_by('Waiting'), dropdownOpen = false"
            class="block px-4 py-3 text-sm w-full text-gray-700 hover:bg-indigo-600 hover:text-white">Waiting</button>
          <button @click="sory_by('Approved'), dropdownOpen = false"
            class="block px-4 py-3 text-sm w-full text-gray-700 hover:bg-indigo-600 hover:text-white">Approved</button>
          <button @click="sory_by('Rejected'), dropdownOpen = false"
            class="block px-4 py-3 text-sm w-full text-gray-700 hover:bg-indigo-600 hover:text-white">Rejected</button>

        </div>
      </transition>
    </div>
    <div class="container md:w-10/12 bg-white my-8 mx-auto rounded-xl">
      <div class="overflow-x-auto rounded-xl">
        <table class="table-auto w-full rounded-xl table-container">
          <thead class="bg-gray-200 text-gray-600 rounded-xl">
            <tr>
              <th class="px-4 pl-2">ID</th>
              <th class="px-4 pl-2">ROOM</th>
              <th class="px-4 pl-2">NAME</th>
              <th class="px-4 pl-2">TIME</th>
              <th class="px-4 pl-2 py-3">STATUS</th>
              <th class="px-4 pl-2" style="padding-left: 4%">ACTION</th>
            </tr>
          </thead>
          <tbody v-for="(items, index) in data" :key="index" class="text-center divide-y">
            <tr v-if="index + 1 <= this.count && index + 1 >= this.number"
              class="hover:bg-gray-50 border-b-2 ml-3 text-slate-800" @click="openDetail(items)">
              <td class="px-5 py-5">{{ index + 1 }}</td>
              <td class="px-4">{{ items.room_refer }}</td>
              <td class="px-4">{{ items.name }}</td>
              <td class="px-4">{{ items.start_date }}<br />{{ items.time }}</td>
              <td class="px-4 cursor-default">
                <p v-if="items.status === 'Approved'"
                  class="rounded-xl bg-emerald-400 text-white text-center p-1 md:w-3/5 mx-auto text-sm">
                  {{ items.status }}
                </p>
                <!-- //(this.fitter == 'ALL'|| this.fitter == 'Waiting Rejected  Approved') -->
                <p v-else-if="items.status === 'Waiting'"
                  class="rounded-xl bg-amber-400 text-white text-center p-1 md:w-3/5 mx-auto text-sm">
                  {{ items.status }}
                </p>
                <p v-else-if="items.status === 'Rejected'"
                  class="rounded-xl bg-red-400 text-white text-center p-1 md:w-3/5 mx-auto text-sm">
                  {{ items.status }}
                </p>
              </td>
              <td class="">
                <div class="flex justify-center items-center" v-if="items.status === 'Waiting'">
                  <button class="flex rounded-md bg-emerald-400 p-1 px-3 text-white hover:bg-emerald-600"
                    @click.stop="Approve(items)">
                    <svg class="my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.92661 9.92661L8.92661 11.9266L12.9266 7.92661M5.76161 2.62361C6.47892 2.56636 7.15989 2.28431 7.70761 1.81761C8.32652 1.28988 9.11325 1 9.92661 1C10.74 1 11.5267 1.28988 12.1456 1.81761C12.6933 2.28431 13.3743 2.56636 14.0916 2.62361C14.9024 2.68811 15.6636 3.03943 16.2387 3.61453C16.8138 4.18963 17.1651 4.95086 17.2296 5.76161C17.2869 6.47892 17.5689 7.15989 18.0356 7.70761C18.5633 8.32652 18.8532 9.11325 18.8532 9.92661C18.8532 10.74 18.5633 11.5267 18.0356 12.1456C17.5689 12.6933 17.2869 13.3743 17.2296 14.0916C17.1651 14.9024 16.8138 15.6636 16.2387 16.2387C15.6636 16.8138 14.9024 17.1651 14.0916 17.2296C13.3743 17.2869 12.6933 17.5689 12.1456 18.0356C11.5267 18.5633 10.74 18.8532 9.92661 18.8532C9.11325 18.8532 8.32652 18.5633 7.70761 18.0356C7.15989 17.5689 6.47892 17.2869 5.76161 17.2296C4.95086 17.1651 4.18963 16.8138 3.61453 16.2387C3.03943 15.6636 2.68811 14.9024 2.62361 14.0916C2.56636 13.3743 2.28431 12.6933 1.81761 12.1456C1.28988 11.5267 1 10.74 1 9.92661C1 9.11325 1.28988 8.32652 1.81761 7.70761C2.28431 7.15989 2.56636 6.47892 2.62361 5.76161C2.68811 4.95086 3.03943 4.18963 3.61453 3.61453C4.18963 3.03943 4.95086 2.68811 5.76161 2.62361Z"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="ml-2 ">Approve</p>
                  </button>
                  <button class="flex rounded-md bg-red-400 p-1 px-2 text-white ml-3 hover:bg-red-600"
                    @click.stop="Refuse(items)">
                    <svg class="my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 12L10 10M10 10L12 8M10 10L8 8M10 10L12 12M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="ml-2">Reject</p>
                  </button>
                                    <!-- //@click="openDetail(items)" -->
                </div>
              </td>
              <div class="relative">
                <div class="absolute"></div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex w-full p-4 pl-8">
        <p class="flex-none text-center justify-center">
          Showing 1 to 1 of 10 results
        </p>
        <div class="flex-1 text-end ml-12">
          <div class="flex justify-end items-center">
            <button @click="prevent_count()" :class="this.count <= 10 ? 'opacity-25' : ''" :disabled="this.count <= 10"
              class="rounded-xl px-3 text-red-700">
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.79294 0.792969L0.0859375 6.49997L5.79294 12.207L7.20694 10.793L2.91394 6.49997L7.20694 2.20697L5.79294 0.792969Z"
                  fill="#828282" />
              </svg>
            </button>
            {{ this.count / 10 }}
            <button @click="next_count()" :class="this.count >= this.max_obj ? 'opacity-25' : ''"
              :disabled="this.count >= this.max_obj" class="rounded-xl px-3">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.414 11.414L7.121 5.707L1.414 0L0 1.414L4.293 5.707L0 10L1.414 11.414Z" fill="#828282" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style >
body {
  color: black;
  background-color: black;
}

.table-container {
  white-space: nowrap;
}

.media {
  height: 800px;
}

.bg-main {
  background-color: transparent !important;
}</style>
