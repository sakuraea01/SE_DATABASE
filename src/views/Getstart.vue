<template>
  <!-- <div class="relative ">
    <img src="../assets/bg-2.png" alt=""
      class="absolute -translate-y-[5rem] translate-x -z-10  object-cover w-full">
  </div> -->
  <div class=" container mx-auto p-8 rounded-xl min-h-screen pt-24 ">
    <p class="text-center uppercase text-white text-4xl font-bold "> Computer Science CMU<br>
      Classroom booking system
    </p>
    <p class="text-white text-center text-gray-500 pt-4">Using the department calendar, you can view reserved rooms,
      including classrooms. Additionally,
      <br> you can schedule various activities within the calendar for the upcoming semester.
    </p>


      <div class="flex-1 text-center mx-auto my-8">
        <div class="grid">
          <div class="animate-bounce  w-6 h-6 mx-auto mb-8  text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
          <div>
            <button><router-link to="/dashboard" class="bg-sky-400 p-3 rounded-xl mt-3 text-lg text-white">Get
                started</router-link></button>
          </div>
        </div>
      </div>
      <video autoplay loop muted class="rounded-xl w-4/5 mx-auto">
        <source src="../assets/New.mp4" type="video/mp4" >
        <!-- ทำการเพิ่มไฟล์วิดีโอที่ต้องการให้แสดง -->
      </video>
      <div class="my-10"></div>

      <div class="grid">
        <div class="  my-auto ml-20">
          <p class="text-white text-2xl">How can I know if my request has been approved?</p>
        </div>
        <div class="ml-40 text-center mx-auto my-8  rounded-xl">
          <img src="../assets/Approved.png" alt="" class="rounded-xl">
        </div>
        
      </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  },

}
</script>

<style scoped>
body {
  color: white;
}
img {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>