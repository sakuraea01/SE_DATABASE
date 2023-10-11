<template>
  <div class="flex transition ">
    <div class="flex bg-[#020314]  ">
      <!-- Backdrop /-->
      <div class="fixed inset-0 z-30 transition-opacity bg-black opacity-50 xl:hidden"
        :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"></div>
      <!-- End Backdrop -->
      <div :class="isOpen
        ? 'translate-x-0 xl:translate-x-0 xl:static xl:inset-0 w-64'
        : '-translate-x-full lg:left-24 lg:relative lg:w-24'
        "
        class="fixed  inset-y-0 left-0 z-30  overflow-y-auto transition ease-out duration-500 bg-[#020314] overflow-x-hidden"
        style=" position: fixed;
">
        <div class="flex items-center justify-center mt-8">
          <router-link class="flex items-center" to="/">
            <img
              src="data:image/png;base64,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"
              class="rounded-3xl w-14 my-auto py-auto" :class="isOpen ? 'w-24 h-24' : ''" alt="" />
          </router-link>
        </div>
        <div class="w-full grid text-center py-2">
          <span v-if="isOpen" class="text-white mx-auto text-center"> Computer Science CMU </span>
        </div>
        <nav class="p-5 mx-auto">
          <router-link class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900  hover:bg-gray-600 hover:bg-opacity-25
             hover:text-gray-100  " :class="isActive_Dashboard ? 'text-sky-400 ' : 'text-gray-500'" to="/dashboard"
            @click="Active_funtions('Dashboard')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"
              :class="isOpen ? '' : 'mx-auto'">
              <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 
                0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 
                0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 
                .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              <path fill-rule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clip-rule="evenodd" />
            </svg>

            <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Dashboard</span>
          </router-link>

          <div>
            <router-link v-if="admin == true"
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900  hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              :class="isActive_Course ? 'text-sky-400 ' : 'text-gray-500'" to="/Course"
              @click="Active_funtions('Course')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"
                :class="isOpen ? '' : 'mx-auto'">
                <path
                  d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                <path
                  d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Add Course</span>
            </router-link>
            <!-- v-if="admin != null" for 59 -->
            <router-link v-if="admin == true"
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900  hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              :class="isActive_admin ? 'text-sky-400 ' : 'text-gray-500'" to="/admin" @click="Active_funtions('admin')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                  clip-rule="evenodd" />
                <path fill-rule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd" />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Pending Requests</span>
            </router-link>
            <router-link 
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900  hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              :class="isActive_My_reservations ? 'text-sky-400 ' : 'text-gray-500'" to="/My_reservations"
              @click="Active_funtions('My_reservations')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"
                :class="isOpen ? '' : 'mx-auto'">
                <path fill-rule="evenodd"
                  d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z"
                  clip-rule="evenodd" />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">My reservations</span>
            </router-link>
            <router-link v-if="email_user == '' || email_user == null"
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900  hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              :class="isActive_login ? 'text-sky-400 ' : 'text-gray-500'" to="/login" @click="Active_funtions('login')">
              <svg class="w-5 h-5" :class="isOpen ? '' : 'mx-auto'" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M0.333618 8.99996C0.333618 9.22097 0.421416 9.43293 0.577696 9.58922C0.733976 9.7455 0.945938 9.83329 1.16695 9.83329H7.49195L5.57528 11.7416C5.49718 11.8191 5.43518 11.9113 5.39287 12.0128C5.35057 12.1144 5.32879 12.2233 5.32879 12.3333C5.32879 12.4433 5.35057 12.5522 5.39287 12.6538C5.43518 12.7553 5.49718 12.8475 5.57528 12.925C5.65275 13.0031 5.74492 13.0651 5.84647 13.1074C5.94802 13.1497 6.05694 13.1715 6.16695 13.1715C6.27696 13.1715 6.38588 13.1497 6.48743 13.1074C6.58898 13.0651 6.68115 13.0031 6.75862 12.925L10.0919 9.59163C10.1678 9.51237 10.2273 9.41892 10.2669 9.31663C10.3503 9.11374 10.3503 8.88618 10.2669 8.68329C10.2273 8.581 10.1678 8.48755 10.0919 8.40829L6.75862 5.07496C6.68092 4.99726 6.58868 4.93563 6.48716 4.89358C6.38564 4.85153 6.27683 4.82988 6.16695 4.82988C6.05707 4.82988 5.94826 4.85153 5.84674 4.89358C5.74522 4.93563 5.65298 4.99726 5.57528 5.07496C5.49759 5.15266 5.43595 5.2449 5.3939 5.34642C5.35185 5.44794 5.33021 5.55674 5.33021 5.66663C5.33021 5.77651 5.35185 5.88532 5.3939 5.98683C5.43595 6.08835 5.49759 6.18059 5.57528 6.25829L7.49195 8.16663H1.16695C0.945938 8.16663 0.733976 8.25442 0.577696 8.4107C0.421416 8.56698 0.333618 8.77895 0.333618 8.99996ZM11.1669 0.666626H2.83362C2.17058 0.666626 1.53469 0.930018 1.06585 1.39886C0.59701 1.8677 0.333618 2.50358 0.333618 3.16663V5.66663C0.333618 5.88764 0.421416 6.0996 0.577696 6.25588C0.733976 6.41216 0.945938 6.49996 1.16695 6.49996C1.38797 6.49996 1.59993 6.41216 1.75621 6.25588C1.91249 6.0996 2.00028 5.88764 2.00028 5.66663V3.16663C2.00028 2.94561 2.08808 2.73365 2.24436 2.57737C2.40064 2.42109 2.6126 2.33329 2.83362 2.33329H11.1669C11.388 2.33329 11.5999 2.42109 11.7562 2.57737C11.9125 2.73365 12.0003 2.94561 12.0003 3.16663V14.8333C12.0003 15.0543 11.9125 15.2663 11.7562 15.4225C11.5999 15.5788 11.388 15.6666 11.1669 15.6666H2.83362C2.6126 15.6666 2.40064 15.5788 2.24436 15.4225C2.08808 15.2663 2.00028 15.0543 2.00028 14.8333V12.3333C2.00028 12.1123 1.91249 11.9003 1.75621 11.744C1.59993 11.5878 1.38797 11.5 1.16695 11.5C0.945938 11.5 0.733976 11.5878 0.577696 11.744C0.421416 11.9003 0.333618 12.1123 0.333618 12.3333V14.8333C0.333618 15.4963 0.59701 16.1322 1.06585 16.6011C1.53469 17.0699 2.17058 17.3333 2.83362 17.3333H11.1669C11.83 17.3333 12.4659 17.0699 12.9347 16.6011C13.4036 16.1322 13.6669 15.4963 13.6669 14.8333V3.16663C13.6669 2.50358 13.4036 1.8677 12.9347 1.39886C12.4659 0.930018 11.83 0.666626 11.1669 0.666626Z"
                  fill="currentColor"></path>
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Sign in</span>
            </router-link>
            <router-link @click="logout"  v-if="email_user != ''"
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900  hover:bg-red-500 hover:bg-opacity-50 hover:text-gray-100"
              :class="isActive_login ? 'text-sky-400 ' : 'text-gray-500'" to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6" :class="isOpen ? '' : 'mx-auto'">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Sign Out</span>
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <div class="flex-1 z-10 relative flex flex-col overflow-hidden transition  ease-in-out duration-500 " :class="isOpen ? 'translate-x-0  ease-out  lg:translate-x-0 ' : ''
      // : '' -translate-x-full ease-in
      ">

      <main class="overflow-x-hidden overflow-y-auto shadow-t transition  ease-in-out duration-500  top-0 sticky">
        <header class="flex items-center justify-between px-6 py-4  bg-transparent text-gray-500 z-40">
          <div class="flex items-center" style="margin-left: 20%;">
            <button class="text-white focus:outline-none mr-4 p-2 rounded-xl hover:text-black hover:bg-gray-100"
              @click="isOpen = !isOpen">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="flex items-center">
            <div class="relative">
              <div
                class="relative z-10 hidden sm:block w-10 h-10 overflow-hidden bg-white rounded-full shadow focus:outline-none">
                <img src="./assets/Profile.jpg" alt="" class="object-cover min-h-full cursor-pointer ">
              </div>
              <button
                class="relative z-10 block sm:hidden w-10 h-10 ml-30 overflow-hidden rounded-full shadow focus:outline-none"
                @click="dropdownOpen = !dropdownOpen">
                <div class="center con-avatars flex justify-items-center">
                  <vs-avatar class="">
                    <i class="bx bx-user"></i>
                  </vs-avatar>
                </div>
              </button>

              <div v-show="dropdownOpen" class="fixed block sm:hidden inset-0 z-10 w-full h-full"
                @click="dropdownOpen = false"></div>
<!-- 
              <transition enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0">
                <div v-show="dropdownOpen"
                  class="absolute block sm:hidden right-0 z-20 w-48 py-3 mt-2 bg-white rounded-md shadow-xl">
                  <a href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                  <a href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                </div>
              </transition> -->
            </div>
            <div class="hidden sm:block relative ml-3">
              <p class="flex gap-2  ">
              <div v-if="token_user == false">
                <router-link class="text-white p-2 px-6 cursor-pointer rounded-xl border text-xs font-bold transition ease-in-out duration-200  hover:border-[#3B82F6] hover:bg-[#3B82F6]
                " to="/login">
                  SIGN IN
                </router-link>
                <!-- <router-link
                  class=" ml-2 text-white p-2 px-6 cursor-pointer rounded-xl border text-xs font-bold transition ease-in-out duration-200  hover:border-[#3B82F6] hover:bg-[#3B82F6] "
                  to="/login">
                  SIGN UP
                </router-link> -->
              </div>
              <p v-if="token_user" class="text-white p-1 px-2 cursor-pointer rounded-xl hover:bg-white text-xs hover:text-black transition 
                 ease-in-out duration-100 ">
                {{ email_user }}
              </p>
              </p>

              <!-- <transition enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0">
                <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-3 mt-2 bg-white rounded-md shadow-xl">
                  <a href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                  <a href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                </div>
              </transition> -->
            </div>
          </div>
        </header>
        <div class="flex-1  ">
          <router-view class="bg-main ">
          </router-view>
        </div>
      </main>
    </div>
  </div>
  <footer class="relative py-10 flex flex-col items-center bg-[#020314] overflow-hidden md:py-40">
    <div class="relative z-[1] container m-auto px-6 md:px-12">
      <div class="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
        <div class="flex flex-wrap items-center justify-between md:flex-nowrap">
          <div class="w-full space-x-12 flex justify-center text-gray-300 sm:w-7/12 md:justify-start">
            <ul class="list-disc list-inside space-y-8">
              <li>
                <a href="#" class="hover:text-sky-400 transition">Home</a>
              </li>

              <li>
                <a href="#" to="/dashboard" class="hover:text-sky-400 transition">Dashboard</a>
              </li>
              <li>
                <a href="#" to="/My_reservations" class="hover:text-sky-400 transition">Nofitication</a>
              </li>
            </ul>

            <ul role="list" class="space-y-8">
              <li>
                <a href="https://twitter.com/cmuofficial_tw?lang=en"
                  class="flex items-center space-x-3 hover:text-sky-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16">
                    <path
                      d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@ChiangMaiUniversity"
                  class="flex items-center space-x-3 hover:text-sky-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16">
                    <path
                      d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>
                  <span>YouTube</span>
                </a>
              </li>

              <li>
                <a href="https://www.facebook.com/compscicmu/"
                  class="flex items-center space-x-3 hover:text-sky-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16">
                    <path
                      d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="w-10/12 m-auto mt-16 space-y-6 text-center sm:text-left sm:w-5/12 sm:mt-auto">
            <span class="font-semibold text-white">

              <a href="https://www.cs.science.cmu.ac.th/"
                class="flex items-center space-x-3 hover:text-sky-400 transition">

                <img
              src="data:image/png;base64,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"
              class="rounded-3xl w-14 my-auto py-auto" :class="isOpen ? 'w-24 h-24' : ''" alt="" /><span class="uppercase "> Computer Science CMU</span>
              </a>
            </span>
            <span class="block text-gray-300 py-3">Department of Computer Science<br> Chiang Mai University,
              239 Huay Kaew Rd., Suthep, Muang, <br>Chiang Mai 50200, Thailand.</span>

            <span class="font-semibold text-white ">
              <a href="https://www.facebook.com/cscmuhomecoming/"
                class="flex items-center space-x-3 hover:text-sky-400 transition my-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5" viewBox="0 0 16 16">
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                <span> Facebook Page Alumni</span>
              </a>
              <a href="https://www.google.com/maps/d/u/0/viewer?mid=1XzZUWuQlmVJeZC2dcBxA2yKIXO8&ll=18.80376300042011%2C98.95247199999993&z=20"
                class="flex items-center space-x-3 hover:text-sky-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span> Location</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="absolute h-full inset-0 flex items-center">
      <div aria-hidden="true"
        class="bg-layers bg-scale w-56 h-56 m-auto blur-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full md:w-[30rem] md:h-[30rem] md:blur-3xl">
      </div>
    </div>
    <div aria-hidden="true" class="absolute inset-0 w-full h-full bg-[#020314] opacity-80"></div>
  </footer>
</template>

<script>
import { ref } from "vue";
import jwt_decode from "jwt-decode";
// import { provide } from "vue";
// import store from "@/store";

export default {
  setup() {
    const name = ref(null)
    const admin = ref(false)
    // navbar larf active
    const isActive_Dashboard = ref(false);
    const isActive_Course = ref(false);
    const isActive_admin = ref(false);
    const isActive_My_reservations = ref(false);
    const isActive_login = ref(false);
    const token_user = ref(false);
    const decodedToken = ref({});
    const email_user = ref('');
    const Active_funtions = (info) => {
      if (info == 'Dashboard') {
        isActive_Dashboard.value = true
        isActive_Course.value = false
        isActive_admin.value = false
        isActive_My_reservations.value = false
        isActive_login.value = false
      } else if (info == 'Course') {
        isActive_Dashboard.value = false
        isActive_Course.value = true
        isActive_admin.value = false
        isActive_My_reservations.value = false
        isActive_login.value = false
      } else if (info == 'admin') {
        isActive_Dashboard.value = false
        isActive_Course.value = false
        isActive_admin.value = true
        isActive_My_reservations.value = false
        isActive_login.value = false
      } else if (info == 'My_reservations') {
        isActive_Dashboard.value = false
        isActive_Course.value = false
        isActive_admin.value = false
        isActive_My_reservations.value = true
        isActive_login.value = false
      } else if (info == 'login') {
        isActive_Dashboard.value = false
        isActive_Course.value = false
        isActive_admin.value = false
        isActive_My_reservations.value = false
        isActive_login.value = true
      }
    }
    // set navbar start
    onMounted(() => {
      const pathArray = window.location.pathname.split('/');

      currentRoute.value = pathArray[pathArray.length - 1];
      console.log("asdasds", currentRoute.value);
      if (currentRoute.value == 'dashboard') {
        isActive_Dashboard.value = true
        isActive_Course.value = false
        isActive_admin.value = false
        isActive_My_reservations.value = false
        isActive_login.value = false
      } else if (currentRoute.value == 'Course') {
        isActive_Dashboard.value = false
        isActive_Course.value = true
        isActive_admin.value = false
        isActive_My_reservations.value = false
        isActive_login.value = false
      } else if (currentRoute.value == 'admin') {
        isActive_Dashboard.value = false
        isActive_Course.value = false
        isActive_admin.value = true
        isActive_My_reservations.value = false
        isActive_login.value = false
      } else if (currentRoute.value == 'My_reservations') {
        isActive_Dashboard.value = false
        isActive_Course.value = false
        isActive_admin.value = false
        isActive_My_reservations.value = true
        isActive_login.value = false
      } else if (currentRoute.value == 'login') {
        isActive_Dashboard.value = false
        isActive_Course.value = false
        isActive_admin.value = false
        isActive_My_reservations.value = false
        isActive_login.value = true
      }
      console.log("currentRoute : ", currentRoute.value);
    });
    // get token
    onMounted(() => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        token_user.value = true
        decodedToken.value = jwt_decode(token);
        name.value = decodedToken.first_name
        email_user.value = decodedToken.value.email
        if(decodedToken.value.role == 'admin') {
          admin.value = true
        }
        console.log("email_user :::  ",typeof email_user );
        console.log("decodedToken : ", email_user.value);
      } else {
        token_user.value = false
      }
      console.log("token_user : ", token_user.value);
    });
    const currentRoute = ref(null);


    const logout = () => {
      localStorage.removeItem("jwtToken");
      name.value = null; // เคลียร์ค่า name
      console.log("Logout sucsess");
      setTimeout(() => {
        window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
      }, 1000);
    };
    // provide("store", store);
    const dropdownOpen = ref(false);
    const isOpen = ref(false);
    const show = ref(false);
    return {
      token_user,
      email_user,
      currentRoute,
      isActive_Dashboard,
      isActive_Course,
      isActive_admin,
      isActive_My_reservations,
      isActive_login,
      Active_funtions,
      logout,
      dropdownOpen,
      name,
      admin,
      isOpen,
      show,
    };
  },
};
</script>
<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap");

* {
  font-family: "Inter", sans-serif !important;
  @apply font-medium;
}

.bg-main {
  /* background-color: #f9fcurrentColor/
  /* background: linear-gradient(rgb(47, 150, 163), rgb(48,62,143)); */

  /* background-color: rgb(241, 245, 251);  */
  background-color: #f1f5f9 !important;
  /* e7e9f0 */
}

.bg-sec {
  background-color: #fff !important;
  @apply border-solid;
}

body {
  background-color: #fff !important;
  background-image: url(./assets/background.png);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  font-family: inherit !important;
  line-height: inherit !important;
  @apply tracking-wide;

}

@media (max-width: 325px) {
  .inputz:focus {
    @apply absolute left-16 transform z-50 duration-300 w-60;
  }
}

@media (min-width: 326px) and (max-width: 450px) {
  .inputz:focus {
    @apply absolute left-16 transform z-50 duration-300 w-64;
  }
}

@media (min-width: 520px) {
  .inputz {
    @apply w-52;
  }
}</style>
