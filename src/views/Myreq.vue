<script>
import { watchEffect, ref, defineComponent } from "vue";
import editmodal from "../components/Modals/edit_user_modal.vue";
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import jwt_decode from "jwt-decode";


export default {

  components: {
    editmodal,
  },

  setup() {
    const edit_new = ref({
      id: null,
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
      start_date: null,
      end_date: null,
      type: null,
      status: null
    })
    const data = ref([])
    const token_id = ref(null);
    return {
      showEditModal: ref(false),
      token_id,
      max_obj: 0,
      count: ref(10),
      number: ref(1),
      data,
      edit_new,
      room: "",
    }
  },

  methods: {
    edit: function (data_edit) {
      console.log("AAAAAAAAAAA : ", data_edit);
      this.showEditModal = true
      this.setModalOpen(data_edit)
    },

    next_count: function () {
      this.count += 10;
      this.number += 10;
    },
    prevent_count: function () {
      this.count -= 10;
      this.number -= 10;
    },
    // CLOSE MODAL
    closeModal: function () {
      this.showEditModal = false
    },
    // OPEN MODAL
    setModalOpen: function (obj) {
      this.edit_new = obj
      console.log("edit new", this.edit_new);
    },

    res_alert_false: function () {
      Swal.fire({
        title: "Reservation false!",
        text: "Please double-check the time, as there may already be a booking during this period!.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      });
    },
    alert_time_false: function () {
      Swal.fire({
        title: "Reservation false!",
        text: "he start time cannot be after the end time.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      });
    },
    saveEdit: function (param) {
      Swal.fire({
        title: "Are you sure?",
        // text: "Do you want to reject this?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("jwtToken");
          const headers = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          let setdate = new Date(param.start_date);
          let day = setdate.getDate().toString().padStart(2, "0");
          let month = (setdate.getMonth() + 1).toString().padStart(2, "0");
          let year = setdate.getFullYear().toString();
          let formattedDate = `${day}-${month}-${year}`;
          param.start_date = formattedDate;
          let startDate = new Date(param.start_date);
          let endDate = new Date(param.start_date);
          let startTime = param.start_time.split(":");
          let endTime = param.end_time.split(":");
          let error_ = false;
          if (param.description == '' || param.description == null || param.course_instructor == null || param.course_instructor == '') {
            error_ = true
          }
          startDate.setHours(startTime[0], startTime[1]);
          endDate.setHours(endTime[0], endTime[1]);
          console.log("param : ", param);
          axios
            .get("http://localhost:3000/api/reservations/list", headers)
            .then((response) => {
              const reservations = response.data;
              const overlappingReservation = reservations.find((reservation) => {
                const reservationStartDate = new Date(reservation.start_date);
                const reservationEndDate = new Date(reservation.start_date);
                const reservationStartTime = reservation.start_time.split(":");
                const reservationEndTime = reservation.end_time.split(":");
                reservationStartDate.setHours(
                  reservationStartTime[0],
                  reservationStartTime[1]
                );
                reservationEndDate.setHours(
                  reservationEndTime[0],
                  reservationEndTime[1]
                );

                // เพิ่มเงื่อนไขที่ตรวจสอบว่า param.start_time มากกว่า param.end_time
                if (startDate > endDate) {
                  return true;
                }
                if (error_ == true) {
                  return true;
                }
                return (
                  startDate.setHours(startTime[0], startTime[1]) < reservationEndDate.setHours(reservationEndTime[0], reservationEndTime[1])
                  && endDate.setHours(endTime[0], endTime[1]) > reservationStartDate.setHours(reservationStartTime[0], reservationStartTime[1]) &&
                  reservation.room_refer == param.room_refer &&
                  reservation.status != "Rejected"
                );
              });

              if (overlappingReservation || startTime[0] > endTime[0]) {
                if (startTime[0] > endTime[0]) {
                  this.alert_time_false();
                } else {
                  this.res_alert_false();
                }
              } else {
                axios
                  .put(`http://localhost:3000/api/reservations/update/${param.id}`, param)
                  .then((response) => {
                    console.log('POST request successful:', response.data);
                    this.closeModal()
                    this.showAlert()
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  })
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });

        }
      });
    },
    // delete
    delete_req: function (param) {
      Swal.fire({
        title: 'Are you sure?',
        // text: "Do you want to reject this?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:3000/api/reservations/delete/${param.id}`, param)
            .then((response) => {
              console.log('POST request successful:', response.data);
              this.closeModal()
              setTimeout(() => {
                window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              },);

            })
            .catch((error) => {
              console.error('Error:', error);
            })
        }
      })

    },
    // showAlert
    showAlert: function () {
      Swal.fire({
        title: "Good job!",
        text: "Edit!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            window.location.reload();
          },);
        }
      });
    },
  },
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
      const response = ref(await axios.get(`http://localhost:3000/api/users/get/${token_id.value}`)); // ID
      console.log("response AAA : ", response);
      const user_first_name = ref(response.value.data.first_name)
      const user_last_name = ref(response.value.data.last_name)
      const user_college_id = ref(response.value.data.college_id)
      const user_phone = ref(response.value.data.phone)
      this.data = response.value.data.request.map(eventnew => {
        if (eventnew.type == "course") {
          return null;
        }
        return {
          id: eventnew.id,
          name: user_first_name.value + "  " + user_last_name.value,
          phone: user_phone.value,
          user_refer: eventnew.user_refer,
          admin_refer: eventnew.admin_refer,
          room_refer: eventnew.room_refer,
          course_id: eventnew.course_id,
          course_section: eventnew.course_section,
          course_name: eventnew.course_name,
          course_type: eventnew.course_type,
          course_instructor: eventnew.course_instructor,
          course_instructor_email: eventnew.course_instructor_email,
          day_of_week: eventnew.day_of_week,
          end_date: eventnew.end_date,
          description: eventnew.description, // string
          start_time: eventnew.start_time, //16:30 string
          end_time: eventnew.end_time,
          start_date: eventnew.start_date,
          time: eventnew.start_time + ' - ' + eventnew.end_time,
          type: eventnew.type, // string
          status: eventnew.status, // string
        }
      }).filter((event) => event !== null);
      this.data.sort((a, b) => a.id - b.id);
      this.max_obj = this.data.length
      console.log("response : ", this.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
  mounted() {
    this.room = "ROOM"
  },
}
</script>
<template>
  <div class="media min-h-screen">
    <div class="flex items-center max-w-xl justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
          clip-rule="evenodd" />
      </svg>
      <p class="text-start text-white text-3xl md:mx-0 p-2 "> My reservations </p>
    </div>
    <div class="container md:w-10/12 bg-white my-8 mx-auto rounded-xl">

      <div class="overflow-x-auto rounded-xl">
        <table class="table-auto w-full ">
          <thead class="bg-gray-200 text-gray-600 rounded-xl">
            <tr>
              <th class="px-4 pl-2">ID</th>
              <th class="px-4 pl-2">ROOM</th>
              <th class="px-4 pl-2">NAME</th>
              <th class="py-3 px-4 pl-2" style="max-width: 150px;">DETAILS</th>
              <th class="px-4 pl-2">TIME</th>
              <th class="py-3 px-4 pl-2">STATUS</th>
              <th class="px-4 pl-2" style="padding-left: 4%;">ACTION</th>
            </tr>
          </thead>

          <tbody v-for="(items, index) in data" :key="index" class="text-center ">
            <tr v-if="index + 1 <= this.count && index + 1 >= this.number"
              class="hover:bg-gray-50 ml-3 text-slate-800 border-b-2 ml-3 ">
              <td class="px-4 py-5">{{ index + 1 }}</td>
              <td class="px-4">{{ items.room_refer }}</td>
              <td class="px-4">{{ items.name }}</td>
              <td class="px-4 overflow-hidden whitespace-nowrap" style="max-width: 150px;">
                <p class="truncate">{{ items.description }}</p>
              </td>
              <td class="px-4 whitespace-nowrap">{{ items.start_date }}<br> {{ items.time }} </td>
              <td class="px-4 cursor-default whitespace-nowrap">
                <p v-if="items.status === 'Approved'"
                  class=" rounded-xl bg-emerald-400 text-white text-center p-2  mx-auto text-sm"> {{ items.status
                  }}</p>
                <p v-else-if="items.status === 'Waiting'"
                  class=" rounded-xl bg-amber-400 text-white text-center p-2 mx-auto text-sm">
                  {{ items.status }}
                </p>
                <p v-else="items.status === 'Rejected'"
                  class=" rounded-xl bg-red-400 text-white text-center p-2 mx-auto text-sm">
                  {{ items.status }}</p>
              </td>
              <td class="mr-4">
                <div class="flex  items-center justify-center ">
                  <button data-tooltip-target="tooltip-default" type="button"
                    class="flex rounded-md bg-indigo-400 p-1 px-3 text-white  hover:bg-indigo-600" @click="edit(items)"
                    v-if="items.status == 'Waiting'">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.33939 4.09832H3.09697C2.54082 4.09832 2.00745 4.31925 1.61419 4.71251C1.22093 5.10577 1 5.63914 1 6.19529V17.7286C1 18.2848 1.22093 18.8181 1.61419 19.2114C2.00745 19.6047 2.54082 19.8256 3.09697 19.8256H14.6303C15.1864 19.8256 15.7198 19.6047 16.1131 19.2114C16.5063 18.8181 16.7273 18.2848 16.7273 17.7286V12.4862M15.2447 2.61577C15.4381 2.41548 15.6695 2.25573 15.9254 2.14583C16.1812 2.03593 16.4564 1.97808 16.7348 1.97567C17.0132 1.97325 17.2894 2.0263 17.5471 2.13174C17.8048 2.23718 18.0389 2.39288 18.2358 2.58977C18.4327 2.78666 18.5884 3.02079 18.6938 3.2785C18.7993 3.53621 18.8523 3.81234 18.8499 4.09078C18.8475 4.36921 18.7897 4.64437 18.6798 4.90021C18.5699 5.15605 18.4101 5.38744 18.2098 5.58088L9.20753 14.5832H6.24242V11.6181L15.2447 2.61577Z"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="ml-2"> Edits </p>
                  </button>

                  <button data-tooltip-target="tooltip-default" type="button"
                    class="flex rounded-md bg-red-400 p-1 px-3 text-white ml-2 hover:bg-red-600"
                    @click="delete_req(items)">
                    <svg class="my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 12L10 10M10 10L12 8M10 10L8 8M10 10L12 12M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="ml-2"> Delete </p>
                  </button>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="max_obj != 0" class="flex w-full p-4 pl-8 ">
        <p class="flex-none text-center"> Showing 1 to 1 of 10 results </p>
        <div class="flex-1 text-end ml-12">

          <div class="flex justify-end items-center ">
            <button @click="prevent_count()" :class="this.count <= 10 ? 'opacity-25' : ''" :disabled="this.count <= 10"
              class=" rounded-xl  px-3  text-red-700">
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.79294 0.792969L0.0859375 6.49997L5.79294 12.207L7.20694 10.793L2.91394 6.49997L7.20694 2.20697L5.79294 0.792969Z"
                  fill="#828282" />
              </svg>

            </button>
            {{ this.count / 10 }}
            <button @click="next_count()" :class="this.count >= this.max_obj ? 'opacity-25' : ''"
              :disabled="this.count >= this.max_obj" class=" rounded-xl px-3"><svg width="8" height="12"
                viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.414 11.414L7.121 5.707L1.414 0L0 1.414L4.293 5.707L0 10L1.414 11.414Z" fill="#828282" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div v-if="max_obj == 0" class="flex w-full p-4 pl-8 text-center w-full py-14">
        <p class="text-center w-full text-">You haven't logged in or made any reservations yet.</p>
      </div>
    </div>
  </div>
  <editmodal v-if="showEditModal" :form="edit_new" @closeModal="closeModal" @saveEdit="saveEdit" />
</template>
<style>
body {
  height: 1080px;
  color: black;
  background-color: black;
}

.media {
  height: 800px;
}
</style>