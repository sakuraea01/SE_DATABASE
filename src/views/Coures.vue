<script>
import { watchEffect, ref, defineComponent } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import admin_reser from "../components/Modals/admin_reservation.vue";
import EditCourse from "../components/Modals/edit_course_modal.vue";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  components: {
    admin_reser,
    EditCourse,
  },

  setup() {
    const decodedToken = ref({});
    onMounted(() => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        decodedToken.value = jwt_decode(token);
        console.log(decodedToken.value);
      }
    });
    const newEvent = ref({
      user_refer: null, // int  user_id
      admin_refer: null, // int  admin คนไหนกด
      room_refer: null, // string room_id
      // course
      course_id: null, //null เพราะใช้กับ course
      course_section: null, //null เพราะใช้กับ course
      course_name: null, //null เพราะใช้กับ course
      course_type: "Lecture", //null เพราะใช้กับ course
      course_instructor: null, //null เพราะใช้กับ course
      course_instructor_email: null, //null เพราะใช้กับ course
      day_of_week: null, //null เพราะใช้กับ courseฃ
      end_date: null, // ให้มันเป็น null ถ้าจะ add ธรรมดา string
      // end course
      description: "", // string
      start_time: "", //16:30 string
      end_time: "", //16:30 string
      start_date: "", // ต้องใช้ dd-mm-yyyy string
      type: "course", // string
      status: "Approved", // string
    });
    const day_week = ref("");
    const showModal = ref(false);
    const show_edit = ref(false);
    const data = ref([]);
    const max_obj = ref(0);
    const user_name = ref([]);
    const Open_detail = ref(false);
    // for Edit
    const newEvent_edit = ref({});
    const openEdit_modal = (info) => {
      show_edit.value = true;
      console.log("info :", info);
      let dayofweek = info.day_of_week;
      let get_dayofweek = ref("");
      if (dayofweek === "Mon") {
        get_dayofweek.value = "1";
      } else if (dayofweek === "Tue") {
        get_dayofweek.value = "2";
      } else if (dayofweek === "Wed") {
        get_dayofweek.value = "3";
      } else if (dayofweek === "Thu") {
        get_dayofweek.value = "4";
      } else if (dayofweek === "Fri") {
        get_dayofweek.value = "5";
      } else if (dayofweek === "Mon-Thu") {
        get_dayofweek.value = "1,4";
      } else if (dayofweek === "Tue-Fri") {
        get_dayofweek.value = "2,5";
      }
      newEvent_edit.value = info;
      function convertDate(dateString) {
        const [day, month, year] = dateString.split("-");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }

      newEvent_edit.value.start_date = convertDate(
        newEvent_edit.value.start_date
      );
      newEvent_edit.value.end_date = convertDate(newEvent_edit.value.end_date);
      newEvent_edit.value.day_of_week = get_dayofweek.value;
      console.log("newEvent : ", newEvent_edit.value);
    };
    const closeModal_edit = () => {
      setTimeout(() => {
        window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
      },);
      show_edit.value = false;
    };

    const saveAppt_edit = (param) => {
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
          const headers = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          console.log("param : ", param);
          param.user_refer = decodedToken.value.id;
          param.admin_refer = decodedToken.value.id;
          var startDate = new Date(param.end_date);
          var day = startDate.getDate().toString().padStart(2, "0");
          var month = (startDate.getMonth() + 1).toString().padStart(2, "0");
          var year = startDate.getFullYear().toString();
          param.end_date = `${day}-${month}-${year}`;

          var startDate = new Date(param.start_date);
          var day = startDate.getDate().toString().padStart(2, "0");
          var month = (startDate.getMonth() + 1).toString().padStart(2, "0");
          var year = startDate.getFullYear().toString();
          param.start_date = `${day}-${month}-${year}`;
          axios // add courses
            .put(
              `http://localhost:3000/api/reservations/update/${param.id}`,
              param,
              headers
            )
            .then((response) => {
              console.log("POST courses successful : ", response.data);
              closeModal_add();
              setTimeout(() => {
                window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              },);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    };

    const opendateClick = () => {
      showModal.value = true;
    };

    const closeModal_add = () => {
      showModal.value = false;
    };
    const saveAppt_add = (param) => {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      param.user_refer = decodedToken.value.id;
      param.admin_refer = decodedToken.value.id;
      var startDate = new Date(param.end_date);
      var day = startDate.getDate().toString().padStart(2, "0");
      var month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      var year = startDate.getFullYear().toString();
      param.end_date = `${day}-${month}-${year}`;

      var startDate = new Date(param.start_date);
      var day = startDate.getDate().toString().padStart(2, "0");
      var month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      var year = startDate.getFullYear().toString();
      param.start_date = `${day}-${month}-${year}`;
      axios // add courses
        .post("http://localhost:3000/api/reservations/add", param, headers)
        .then((response) => {
          console.log("POST courses successful : ", response.data);
          closeModal_add();
          setTimeout(() => {
            window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
          },);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    return {
      showModal,
      show_edit,
      openEdit_modal,
      closeModal_edit,
      closeModal_add,
      opendateClick,
      decodedToken,
      saveAppt_add,
      saveAppt_edit,
      Open_detail,
      newEvent,
      newEvent_edit,
      count: ref(10),
      number: ref(1),
      data,
      set_detil: {},
    };
  },

  methods: {
    next_count: function () {
      this.count += 10;
      this.number += 10;
    },
    prevent_count: function () {
      this.count -= 10;
      this.number -= 10;
    },

    saveEdit: function (param) {
      console.log(param);
      Swal.fire({
        title: "Are you sure?",
        // text: "Do you want to reject this?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://localhost:3000/api/reservations/update/${param.id}`,
              param
            )
            .then((response) => {
              console.log("POST request successful:", response.data);
              this.closeModal_add();
              setTimeout(() => {
                window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              }, 1000);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    },
    //http://localhost:3000/api/reservations/delete_course/${param.id}/${param.course_section}/${param.course_type}
    Delete_course: function (param) {
      console.log(param);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://localhost:3000/api/reservations/delete_course/${param.course_id}/${param.course_section}/${param.course_type}`,
              param
            )
            .then((response) => {
              console.log("POST request successful:", response.data);
              setTimeout(() => {
                window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              }, 1);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    },
  },
  // GET API users , reservations
  async created() {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const uniqueCourses = new Set();
      const response = await axios.get(
        "http://localhost:3000/api/reservations/list/course",
        headers
      );
      if (Array.isArray(response.data)) {
        this.data = response.data
          .map((eventnew) => {
            const courseKey = `${eventnew.course_type}-${eventnew.course_id}-${eventnew.course_section}`;
            if (!uniqueCourses.has(courseKey)) {
              uniqueCourses.add(courseKey);
              let dayofweek = eventnew.day_of_week;
              let get_dayofweek = ref("");
              if (dayofweek === "1") {
                get_dayofweek.value = "Mon";
              } else if (dayofweek === "2") {
                get_dayofweek.value = "Tue";
              } else if (dayofweek === "3") {
                get_dayofweek.value = "Wed";
              } else if (dayofweek === "4") {
                console.log("loglog  : ");
                get_dayofweek.value = "Thu";
              } else if (dayofweek === "5") {
                get_dayofweek.value = "Fri";
              } else if (dayofweek === "1,4") {
                get_dayofweek.value = "Mon-Thu";
              } else if (dayofweek === "2,5") {
                get_dayofweek.value = "Tue-Fri";
              }
              console.log("info : ", eventnew);
              return {
                id: eventnew.id,
                user_refer: eventnew.user_refer,
                admin_refer: eventnew.admin_refer,
                room_refer: eventnew.room_refer,
                course_id: eventnew.course_id,
                course_section: eventnew.course_section,
                course_name: eventnew.course_name,
                course_type: eventnew.course_type,
                course_instructor: eventnew.course_instructor,
                course_instructor_email: eventnew.course_instructor_email,
                day_of_week: get_dayofweek.value,
                end_date: eventnew.end_date,
                description: eventnew.course_description, // string
                start_time: eventnew.start_time, //16:30 string
                end_time: eventnew.end_time,
                start_date: eventnew.start_date,
                time: eventnew.start_time + " - " + eventnew.end_time,
                type: eventnew.type, // string
                status: eventnew.status, // string
              };
            }
            return null;
          })
          .filter((event) => event !== null);
        this.data.sort((a, b) => a.id - b.id);
        console.log("this.data  : ", this.data);
        this.max_obj = this.data.length;
      } else {
        console.error("Invalid response data:", eventnew.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  },
};
</script>

<template>
  <admin_reser
    v-if="showModal"
    :form="newEvent"
    @closeModal="closeModal_add"
    @saveAppt="saveAppt_add"
  />
  <EditCourse
    v-if="show_edit"
    :form="newEvent_edit"
    @closeModal="closeModal_edit"
    @saveAppt="saveAppt_edit"
  />
  <div class="min-h-screen">
    <div class="container md:w-10/12 bg-white my-8 mx-auto rounded-xl">
      <p class="text-center text-3xl p-6 ">Add course</p>
      <div class="m-5">
        <div class="p-5 border-b-2">
          <button
            @click="opendateClick"
            class="text-center w-full bg-blue-500 rounded-lg p-5 text-white flex justify-center  hover:opacity-90 "
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>ADD COURSE</p>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table-auto w-full rounded-xl table-container">
          <thead class="bg-gray-200 text-gray-600 rounded-xl">
            <tr>
              <th class="px-4 pl-2">ID</th>
              <th class="px-4 pl-2">ROOM</th>
              <th class="px-4 pl-2">DETAILS</th>
              <th class="px-4 pl-2">TIME</th>
              <th class="px-4 pl-2">duration</th>
              <th class="px-4 pl-2 py-3">INSTRUCTOR</th>
              <th class="px-4 pl-2" style="padding-left: 4%">ACTION</th>
            </tr>
          </thead>
          <tbody
            v-for="(items, index) in data"
            :key="index"
            class="text-center divide-y"
          >
            <tr
              v-if="index + 1 <= this.count && index + 1 >= this.number"
              class="hover:bg-gray-50 border-b-2 ml-3"
              @click="setModalOpen"
            >
              <td class="px-5 py-5">{{ index + 1 }}</td>
              <td class="px-5 py-5">{{ items.room_refer }}</td>
              <td class="px-5 py-5">
                {{ items.course_name }}<br />{{ items.course_id }}
                <br />(sec.00{{ items.course_section }}) <br />{{
                  items.course_type
                }}
              </td>
              <td class="px-5 py-5">
                {{ items.time }}<br />{{ items.day_of_week }}
              </td>
              <td class="px-5 py-5">
                {{ items.start_date }}<br />
                -<br />
                {{ items.end_date }}
              </td>
              <td class="px-5 py-5">
                {{ items.course_instructor }}<br />{{ items.email }}
              </td>
              <td>
                <div class="flex justify-center items-center">
                  <button
                    class="flex rounded-md bg-emerald-400 p-1 px-3 text-white hover:bg-emerald-600"
                    @click="openEdit_modal(items)"
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.33939 4.09832H3.09697C2.54082 4.09832 2.00745 4.31925 1.61419 4.71251C1.22093 5.10577 1 5.63914 1 6.19529V17.7286C1 18.2848 1.22093 18.8181 1.61419 19.2114C2.00745 19.6047 2.54082 19.8256 3.09697 19.8256H14.6303C15.1864 19.8256 15.7198 19.6047 16.1131 19.2114C16.5063 18.8181 16.7273 18.2848 16.7273 17.7286V12.4862M15.2447 2.61577C15.4381 2.41548 15.6695 2.25573 15.9254 2.14583C16.1812 2.03593 16.4564 1.97808 16.7348 1.97567C17.0132 1.97325 17.2894 2.0263 17.5471 2.13174C17.8048 2.23718 18.0389 2.39288 18.2358 2.58977C18.4327 2.78666 18.5884 3.02079 18.6938 3.2785C18.7993 3.53621 18.8523 3.81234 18.8499 4.09078C18.8475 4.36921 18.7897 4.64437 18.6798 4.90021C18.5699 5.15605 18.4101 5.38744 18.2098 5.58088L9.20753 14.5832H6.24242V11.6181L15.2447 2.61577Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="ml-2">Edit</p>
                  </button>
                  <button
                    class="flex rounded-md bg-red-400 p-1 px-2 text-white ml-3 hover:bg-red-600"
                    @click="Delete_course(items)"
                  >
                    <svg
                      class="my-auto"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 12L10 10M10 10L12 8M10 10L8 8M10 10L12 12M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="ml-2">Delete</p>
                  </button>
                </div>
              </td>
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
            <button
              @click="prevent_count()"
              :class="this.count <= 10 ? 'opacity-25' : ''"
              :disabled="this.count <= 10"
              class="rounded-xl px-3 text-red-700"
            >
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.79294 0.792969L0.0859375 6.49997L5.79294 12.207L7.20694 10.793L2.91394 6.49997L7.20694 2.20697L5.79294 0.792969Z"
                  fill="#828282"
                />
              </svg>
            </button>
            {{ this.count / 10 }}
            <button
              @click="next_count()"
              :class="this.count >= this.max_obj ? 'opacity-25' : ''"
              :disabled="this.count >= this.max_obj"
              class="rounded-xl px-3"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.414 11.414L7.121 5.707L1.414 0L0 1.414L4.293 5.707L0 10L1.414 11.414Z"
                  fill="#828282"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
body {
  color: black;
  background-color: black;
}
.media {
  height: 800px;
}
.table-container {
  white-space: nowrap;
}
</style>
