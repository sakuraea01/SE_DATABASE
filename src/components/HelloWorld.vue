<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import { defineComponent } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

export default defineComponent({
  components: {
    FullCalendar
  },
  data() {
    const today = new Date();
    const year = today.getFullYear();
    const startMonth = 6; // กำหนดเดือนเริ่มต้น
    const endMonth = 9; // กำหนดเดือนสิ้นสุด

    const events = [];
    for (let month = startMonth; month <= endMonth; month++) {
      for (let dayOfWeek of [1, 4]) { // 1 คือจันทร์, 4 คือพฤหัส
        const firstDay = new Date(year, month - 1, 1);
        let day = (dayOfWeek - firstDay.getDay() + 7) % 7 + 1; // หาวันแรกของสัปดาห์ที่มีวันที่เป็น dayOfWeek

        while (day <= 31) {
          const eventStartDate = new Date(year, month - 1, day, 12, 30);
          const eventEndDate = new Date(year, month - 1, day, 14, 30);

          events.push({
            resourceIds: ['CSB100'],
            groupId: 'blueEvents',
            start: eventStartDate,
            end: eventEndDate,
            repeat: {
                frequency: 'weekly',
                daysOfWeek: ['1', '4'],
                startTime: '12:30',
                endTime: '14:30',
              }
          });

          day += 7; // นับวันไปเรื่อย ๆ ในแต่ละสัปดาห์
        }
      }
    }
    console.log(events);
    return {
      calendarOptions: {
        headerToolbar: { left: 'dayGridMonth,timeGridWeek,Day,Timeline', center: 'title' },
        plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        views: {
          Day: {
            type: 'timeGrid',
            duration: { days: 2 }
          },
          Timeline: {
            type: 'resourceTimeline',
            duration: { days: 1 },
            slotDuration: '00:30:00',
            slotLabelInterval: { hours: 1 }
          }
        },
        resources: [
          { id: 'CSB100', title: 'CSB100' },
          { id: 'CSB207', title: 'CSB207' },
          { id: 'CSB209', title: 'CSB209' },
          { id: 'CSB210', title: 'CSB210' },
          { id: 'CSB301', title: 'CSB301' }
        ],
        events: events
      }
    };
  }
});
</script>
