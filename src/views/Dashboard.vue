<script>
import { watchEffect, ref, defineComponent } from "vue";
import calendar from "../components/Calendar.vue";
import ModalCalendar from "../components/Modals/Calendarmodal.vue";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";

export default {
  components: {
    calendar,
    ModalCalendar,
  },
  setup() {
    const showModal = ref(false);
    const log_in = ref(false);
    const decodedToken = ref({});
    onMounted(() => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        log_in.value = true;
        decodedToken.value = jwt_decode(token);
      }
    });
    return {
      decodedToken,
      log_in,
      calendar,
      showModal,
      ModalCalendar,
      newEvent: {
        user_refer: null, // int  user_id
        admin_refer: null, // int  admin คนไหนกด
        room_refer: null, // string room_id

        // course
        course_id: null, //null เพราะใช้กับ course
        course_section: null, //null เพราะใช้กับ course
        course_name: null, //null เพราะใช้กับ course
        course_type: null, //null เพราะใช้กับ course
        course_instructor: null, //null เพราะใช้กับ course
        course_instructor_email: null, //null เพราะใช้กับ course
        day_of_week: null, //null เพราะใช้กับ courseฃ
        end_date: null, // ให้มันเป็น null ถ้าจะ add ธรรมดา string
        // end course

        description: "", // string
        start_time: "", //16:30 string
        end_time: "", //16:30 string
        start_date: "", // ต้องใช้ dd-mm-yyyy string
        type: "request", // string
        status: "Waiting", // string
      },
      time_A: ref("dasdsad"),
    };
  },
  methods: {
    // switc alert
    res_alert_success: function () {
      Swal.fire({
        title: "Good job!",
        text: "Reservation suscess.",
        icon: "success",
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
    res_alert_false: function () {
      Swal.fire(
        "Create failed.",
        "This period is already in used. Please select again.",
        "warning"
      );
    },
    alert_time_false: function () {
      Swal.fire(
        "Create failed.",
        "Invalid time period. Please select again.",
        "warning"
      );
    },
    // calendar @click
    opendateClick: function (arg) {
      if (this.log_in) {
        this.showModal = true;
        this.setModalOpen(arg);
      } else {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "Please log in first to make a reservation.",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
    set_form: function () {
      this.newEvent.user_refer = null; // int  user_id
      this.newEvent.admin_refer = null; // int  admin คนไหนกด
      this.newEvent.room_refer = null; // string room_id
      // course
      this.newEvent.course_id = null; //null เพราะใช้กับ course
      this.newEvent.course_section = null; //null เพราะใช้กับ course
      this.newEvent.course_name = null; //null เพราะใช้กับ course
      this.newEvent.course_type = null; //null เพราะใช้กับ course
      (this.newEvent.course_instructor = null), //null เพราะใช้กับ course
        (this.newEvent.course_instructor_email = null); //null เพราะใช้กับ course
      this.newEvent.day_of_week = null; //null เพราะใช้กับ courseฃ
      this.newEvent.end_date = null; // ให้มันเป็น null ถ้าจะ add ธรรมดา string
      // end course

      this.newEvent.description = ""; // string
      this.newEvent.start_time = ""; //16:30 string
      this.newEvent.end_time = ""; //16:30 string
      this.newEvent.start_date = ""; // ต้องใช้ dd-mm-yyyy string
      this.newEvent.type = "request"; // string
      this.newEvent.status = "Waiting"; // string
    },
    // closeModal
    closeModal: function () {
      this.showModal = false;
      this.set_form();
    },
    // OpenModal
    setModalOpen: function (obj) {
      let grid_type = obj.view.type;
      if (grid_type == "timeGridWeek" || grid_type == "Timeline") {
        // 2023-08-30T12:30:00+07:00
        let date_at = obj.dateStr.substr(0, 10);
        let time = obj.dateStr.substr(11, 8);
        let setdate = new Date(date_at);
        let day = setdate.getDate().toString().padStart(2, "0");
        let month = (setdate.getMonth() + 1).toString().padStart(2, "0");
        let year = setdate.getFullYear().toString();
        let formattedDate = `${day}-${month}-${year}`;
        this.newEvent.user_refer = this.decodedToken.id;
        this.newEvent.room_refer = obj.resource._resource.id;
        this.newEvent.start_date = formattedDate;
        this.newEvent.start_time = time.substr(0, 5);
      } else {
        this.newEvent.start_date = obj.dateStr.substr(0, 10);
        this.newEvent.start_time = "none";
      }
      return;
    },
    // POST FORM
    saveAppt: function (param) {
      const token = localStorage.getItem("jwtToken");
      let token_decoded = ref({})
      token_decoded.value = jwt_decode(token);
      console.log();
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (token_decoded.value.role == 'admin') {
        param.status = "Approved"
      }
      let startDate = new Date(param.start_date);
      let endDate = new Date(param.start_date);
      let startTime = param.start_time.split(":");
      let endTime = param.end_time.split(":");
      let error_ = false;
      if (param.description == '' || param.description == null || param.course_instructor == null || param.course_instructor == '') {
        console.log("Error rrrrr");
        error_ = true
      }
      startDate.setHours(startTime[0], startTime[1]);
      endDate.setHours(endTime[0], endTime[1]);
      console.log("startDate : ", startDate.setHours(startTime[0], startTime[1]));
      console.log("endDate : ", endDate.setHours(endTime[0], endTime[1]));
      axios
        .get("http://localhost:3000/api/reservations/list", headers)
        .then((response) => {
          const reservations = response.data;
          const overlappingReservation = reservations.find((reservation) => {
            const reservationStartDate = new Date(reservation.start_date);
            const reservationEndDate = new Date(reservation.start_date);
            const reservationStartTime = reservation.start_time.split(":");
            const reservationEndTime = reservation.end_time.split(":");
            console.log("startDate : ", startDate);
            console.log("endDate : ", endDate);

            reservationStartDate.setHours(
              reservationStartTime[0],
              reservationStartTime[1]
            );
            reservationEndDate.setHours(
              reservationEndTime[0],
              reservationEndTime[1]
            );
            console.log("reservationStartTime : ", reservationStartTime);
            console.log("reservationEndTime : ", reservationEndDate.setHours(
              reservationEndTime[0],
              reservationEndTime[1]
            ));
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
              .post(
                "http://localhost:3000/api/reservations/add",
                param,
                headers
              )
              .then((response) => {
                this.closeModal();
                this.res_alert_success(param);
                this.set_form();
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // saveAppt: function (param) {
    //   const token = localStorage.getItem("jwtToken");
    //   const headers = {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   };

    //   console.log(param); // dd/mm/yyyy  yyyy/mm/dd
    //   let startDate = new Date(param.start_date);
    //   let day = startDate.getDate().toString().padStart(2, '0');
    //   let month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    //   let year = startDate.getFullYear().toString();
    //   console.log(`day : ${day}-${month}-${year}`);
    //   let formattedDate = `${day}-${month}-${year}`;
    //   param.start_date = formattedDate
    //   console.log("log param  :", param);
    //   axios
    //     .post('http://localhost:3000/api/reservations/add', param, headers)
    //     .then((response) => {
    //       console.log('POST request successful:', response.data);
    //       this.closeModal()
    //       this.res_alert(param)
    //       this.set_Newevent()
    //       // setTimeout(() => {
    //       //   window.location.reload();
    //       // }, 1000);
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    // },
    // set newevent defauf
  },
};
</script>

<template>
  <div class="container rounded-xl mx-auto p-0 md:p-8 lg:p-10 bg-white overflow-hidden my-8">
    <calendar @dateClick="opendateClick" class=""> </calendar>
  </div>
  <modalCalendar v-if="showModal" :form="newEvent" @closeModal="closeModal" @saveAppt="saveAppt" />
</template>

<style>
.fc-license-message {
  display: none;
  z-index: 0;
}

body {
  color: rgb(30 41 59);
  background-color: black;
}
</style>
