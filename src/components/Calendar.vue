<script>
import { defineComponent, ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import compoDetail from "../components/Modals/showDetail.vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default defineComponent({
  components: {
    FullCalendar,
    compoDetail,
  },
  setup(props, context) {
    // post get  20-06-2030
    const decodedToken = ref({});
    // token
    // GET API
    onMounted(async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          decodedToken.value = jwt_decode(token);
        }
        console.log("token : ", decodedToken);
        const test = await axios.get("http://localhost:3000/api/users/list");
        let user;
        let users = {};
        for (var i = 0; i < test.data.length; i++) {
          user = test.data[i];
          users[user.id] = user;
        }
        const response = await axios.get(
          "http://localhost:3000/api/reservations/list"
        );
        if (Array.isArray(response.data)) {
          console.log("response : ", response.data);
          events_data.value = response.data
            .map((reservation) => {
              var show_time = reservation.start_date;
              var start_date = reservation.start_date.split("-"); // แยกวันที่ออกจากกัน
              reservation.start_date = start_date[2] + "-" + start_date[1] + "-" + start_date[0];
              if (response.end_time != null) {
                var end_time = reservation.start_date.split("-"); // แยกวันที่ออกจากกัน
                reservation.end_time = end_time[2] + "-" + end_time[1] + "-" + end_time[0];
                reservation.end_time = reservation.end_time.toString()
              }
              let status = reservation.status;
              if (status == "Approved") {
                status = "custom-event-color-status-approve";
              } else if (status == "Waiting") {
                status = "custom-event-color-status-wait";
              } else if (status == "Rejected") {
                status = "test";
                return null;
              }
              reservation.start_date = reservation.start_date.toString()
              if (reservation.type == "request") {
                return {
                  title: reservation.room_refer,
                  name:
                    users[reservation.user_refer].first_name +
                    "  " +
                    users[reservation.user_refer].last_name,
                  resourceIds: [reservation.room_refer],
                  description: reservation.description,
                  show_date: show_time,
                  new_title: reservation.description,
                  new_detail: null,
                  show_instructor: reservation.course_instructor,
                  status: reservation.status,
                  start: reservation.start_date + "T" + reservation.start_time,
                  end: reservation.start_date + "T" + reservation.end_time,
                  time: reservation.start_time + "-" + reservation.end_time,
                  type: reservation.type,
                  email: users[reservation.user_refer].email,
                  phone: users[reservation.user_refer].phone,
                  role: users[reservation.user_refer].role,
                  classNames: [status],
                };
              } else if (reservation.type == "course") {
                //             eventBackgroundColor: '#FF5733',
                //             name: "Waraporn Insom",
                //             title: "CSB100",
                //             resourceIds: ['CSB100'],
                //             groupId: 'redEvents',
                //             show_date: eventStartDate,
                //             start: eventStartDate,
                //             end: eventEndDate,
                //             show_instructor: "Waraporn Insom",
                //             status: "Approved",
                //             description: "description...",
                //             time: '12:30 - 14:30',
                //             repeat: {
                //               frequency: 'weekly',
                //               daysOfWeek: [1, 4],
                //               startTime: '12:30',
                //               endTime: '14:30',
                //             },
                //             classNames: ['custom-event-color'],
                return {
                  eventBackgroundColor: "#FF5733",
                  name: reservation.course_instructor,
                  title: reservation.room_refer,
                  resourceIds: [reservation.room_refer],
                  new_title: reservation.course_name,
                  new_detail: reservation.course_id + "(sec.00" + reservation.course_section + ")",
                  email: reservation.course_instructor_email,
                  groupId: "redEvents",
                  show_date: show_time,
                  start: reservation.start_date + "T" + reservation.start_time,
                  end: reservation.start_date + "T" + reservation.end_time,
                  show_instructor: reservation.course_instructor,
                  status: reservation.status,
                  description: "",
                  type: reservation.type,
                  time: reservation.start_time + "-" + reservation.end_time,
                  repeat: {
                    frequency: "weekly",
                    daysOfWeek: [reservation.day_of_week],
                    startTime: reservation.start_time,
                    endTime: reservation.end_time,
                  },
                  classNames: ["custom-event-color ease-in"],
                };
              }
            })
            .filter((event) => event !== null);
          // generateEvents();
          calendarOptions.value.events = events_data.value;

          console.log(
            "calendarOptions.value.events : ",
            calendarOptions.value.events
          );
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
    // END GET API

    // SET DETAIL
    const newEvent = ref({
      room_id: "",
      instructor: "",
      date: "",
      user_id: 640510673, //token user_id
      time_start: "",
      description: "",
      time_end: "",
      status: "",
    });
    const setnewEvent = (info) => {
      console.log("Data detail info : ", info);
      const setinfo = info.event._def;
      newEvent.value.room_id = setinfo.title;
      newEvent.value.email = setinfo.extendedProps.email;
      newEvent.value.name = setinfo.extendedProps.name;
      newEvent.value.date = setinfo.extendedProps.show_date;
      newEvent.value.instructor = setinfo.extendedProps.show_instructor;
      newEvent.value.description = setinfo.extendedProps.description;
      newEvent.value.time_start = setinfo.extendedProps.time;
      newEvent.value.time_end = setinfo.extendedProps.time;
      newEvent.value.status = setinfo.extendedProps.status;
      console.log("Data detail: ", newEvent);
    };
    const showDetail = ref(false);
    const openDetail = (info) => {
      setnewEvent(info);
      showDetail.value = true;
    };
    const closeDetail = () => {
      showDetail.value = false;
    };
    // END SET DETAIL

    // SET COURSE
    const today = new Date();
    const year = today.getFullYear();
    const startMonth = 6;
    const endMonth = 11;
    const start_day_cours = 20;
    const end_day_cours = 18;
    const events_data = ref([]); // keep event course

    // Funtions set course
    // const generateEvents = () => {
    //   for (let month = startMonth; month <= endMonth; month++) {
    //     for (let dayOfWeek of ["1", "4"]) {
    //       const firstDay = new Date(year, month - 1, 1);
    //       let day = (dayOfWeek - firstDay.getDay() + 7) % 7 + 1;

    //       while (day <= 31) {
    //         const eventStartDate = new Date(year, month - 1, day, 12, 30);
    //         const eventEndDate = new Date(year, month - 1, day, 14, 30);
    //         if ((month == startMonth && day < start_day_cours) || (month == endMonth && day > end_day_cours)) {
    //           day += 7;
    //         } else {
    //           console.log("eventStartDateAAAAA : ",eventStartDate);
    //           console.log("eventEndDate : ",eventEndDate);
    //           events_data.value.push({
    //             eventBackgroundColor: '#FF5733',
    //             name: "WAAAAAAAAm",
    //             title: "CSB100",
    //             resourceIds: ['CSB100'],
    //             groupId: 'redEvents',
    //             show_date: eventStartDate,
    //             start: eventStartDate,
    //             end: eventEndDate,
    //             show_instructor: "AAAAAAAAAAAAAAA",
    //             status: "Approved",
    //             description: "description...",
    //             time: '12:30 - 14:30',
    //             repeat: {
    //               frequency: 'weekly',
    //               daysOfWeek: [1, 4],
    //               startTime: '12:30',
    //               endTime: '14:30',
    //             },
    //             classNames: ['custom-event-color'],
    //           });
    //           day += 7;
    //         }
    //       }

    //     }
    //   }
    // }
    // END SET COURSE

    // const clicke_events = (clickinfo) => {
    //   const string_d = ref("")
    //   const test_date = JSON.stringify(clickinfo.event._instance.range.start);
    //   console.log(test_date.substr(0, 20));
    // }
    // set calendar options and funtions for optinscalendar

    // Funtion for calendarOptions
    //SELECT
    const handleDateSelect = (selectInfo) => {
      let calendarApi = selectInfo.view.calendar;
      calendarApi.changeView("Timeline", selectInfo.startStr);
    };
    //DATE CLICK
    const handleDateClick = function (clickinfo) {
      console.log("handleDateClick : ", clickinfo);
      if (clickinfo.view.type === "Timeline") {
        context.emit("dateClick", clickinfo);
      }
    };
    //SET CalendarOptions
    const calendarOptions = ref({
      headerToolbar: { left: "dayGridMonth,Timeline", center: "title" },
      plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      weekends: true,
      select: handleDateSelect,
      // selectable: true, //
      navLinks: true,
      width: 650,
      allDaySlot: false,
      eventTime: false,
      displayEventTime: true,
      slotMinTime: "08:00",
      slotMaxTime: "22:00",

      color: "#FF5733",
      views: {
        Timeline: {
          dateClick: handleDateClick,
          type: "resourceTimeline",
          duration: { days: 1 },
          slotDuration: "00:15",
          slotLabelInterval: { hours: 1 },
        },
      },
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: false,
      },
      resources: [
        { id: "CSB100", title: "CSB100" },
        { id: "CSB201", title: "CSB201" },
        { id: "CSB202", title: "CSB202" },
        { id: "CSB203", title: "CSB203" },
        { id: "CSB207", title: "CSB207" },
        { id: "CSB209", title: "CSB209" },
        { id: "CSB210", title: "CSB210" },
        { id: "CSB301", title: "CSB301" },
        { id: "CSB303", title: "CSB303" },
        { id: "CSB307", title: "CSB307" },
        { id: "CSB308", title: "CSB308" },
        { id: "CSB309", title: "CSB309" },
        { id: "CSB310", title: "CSB310" },
      ],
      events: [],
    });

    return {
      handleDateClick,
      events_data,
      calendarOptions,
      showDetail,
      openDetail,
      handleDateSelect,
      closeDetail,
      newEvent,
    };
  },
});
</script>

<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent="arg" class="h-16">
      <div class="w-full grid group cursor-pointer relative inline-block text-center">
        <div class="w-full flex overflow-hidden" @click="openDetail(arg)">
          <div class="w-full mx-auto grid">
            <div class="flex">
              <b class="mx-auto flex font-semibold ">
                <svg v-if="arg.event.extendedProps.type !== 'course' && arg.event.extendedProps.status == 'Approved'"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-if="arg.event.extendedProps.type !== 'course' && arg.event.extendedProps.status == 'Waiting'"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <b v-if="arg.event.extendedProps.type !== 'course'" class="font-semibold my-auto">{{
                  arg.event.extendedProps.status }}</b></b>
            </div>
            <div class="grid">
              <b v-if="arg.event.extendedProps.type == 'course'" class="mx-auto font-semibold p-1 uppercase">{{
                arg.event.extendedProps.new_title }}</b>
              <b v-if="arg.event.extendedProps.type !== 'course'" class="mx-auto font-medium">{{
                arg.event.extendedProps.new_title }}</b>
            </div>
            <div class="grid">
              <b class="mx-auto font-medium">{{ arg.event.extendedProps.new_detail }}</b>
            </div>
            <div class="flex mx-auto">
              <b class="font-medium">{{ arg.event.extendedProps.time }}</b>
              <b class="ml-3 font-medium" v-if="arg.view.type !== 'Timeline'">{{
                arg.event.title
              }}</b>
            </div>
          </div>
          <!-- <div
            class="opacity-0 w-full hidden bg-gray-400 text-white text-center text-xs rounded-lg py-3 absolute z-10 group-hover:block opacity-100 bottom-full left-auto px-3"
          >
            {{ arg.event.extendedProps.name }}
            <svg
              class="absolute text-black h-2 w-full left-0 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
              xml:space="preserve"
            >
              <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
          </div> -->
        </div>
      </div>
    </template>
  </FullCalendar>
  <compoDetail v-if="showDetail" :setdetail="newEvent" @closeDetail="closeDetail" />
</template>

<style>
body {
  color: black;
  background-color: black;
}

/* rgb(30 41 59) */
b {
  color: rgb(30 41 59);
  font-weight: 500;
}

.custom-event-color {
  color: wheat;
  background-color: #06b6d4;
  border: none;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  transition-duration: 120ms;
  border-radius: 7px;
}

/* #E5E5E5 */
.custom-event-color:hover {
  background-color: #E5E5E5;
  border: none;
  border-radius: 7px;
}

.custom-event-color-status-wait {
  color: rgb(30 41 59);
  background-color: #fbbf24;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  transition-duration: 120ms;
  border: none;
  border-radius: 7px;
}

/* #f97316  #3b82f6 */
.custom-event-color-status-approve {
  color: black;
  background-color: #16a34a;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  transition-duration: 120ms;
  font-weight: 300 !important;
  border: none;
  border-radius: 7px;
}

.fc-slats td,
.fc-slats th {
  height: 20em !important;
  /* ปรับขนาดตามที่ต้องการ */
}

.fc-resource-cell {
  width: 50px;
  /* ปรับความกว้างตามที่ต้องการ */
}

.test {
  background-color: aqua;
  border: none;
  border-radius: 7px;
}</style>
