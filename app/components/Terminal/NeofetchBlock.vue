<script setup lang="ts">
import { PORTFOLIO_DATA } from "~/data/portfolio";
</script>

<template>
  <div class="flex gap-4 font-mono text-sm mt-1">
    <!-- ASCII art slot, isi sendiri -->
    <pre class="text-blue-400 leading-tight">
⡁⠂⠄⡀⠋⠜⢀⣋⠀⡉⢎⣀⣉⠡⢆⡳⣌⢣⢺⣿⠿⠟⢛⡉⠭⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠉⠉⡙⠛⠿⣿⡷⡘⢦⣳⠬⠐⠀⢻⡐⣯⢯⡝⣯⢺⣽⢣⡟⣽⢎⡿⣼
⠀⠀⠂⠄⡉⢌⠸⣧⠀⡹⡜⣠⢌⡱⢌⡳⣌⡷⠋⣡⠔⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠢⢄⡙⠻⣶⢭⢧⣠⢠⣹⠜⣽⣳⢿⡽⣛⣾⢣⢿⣹⡞⣷⢯
⠆⡐⢈⠰⡈⠄⠒⣳⡀⠱⣒⠵⣊⠗⣪⠟⢁⡴⠋⠀⠀⣠⠴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⣄⠙⣶⢥⣋⠶⣙⣿⡽⣯⢿⣹⣯⢛⡾⣷⣻⡽⣯
⡒⣐⠂⢆⡱⢈⠔⡈⠇⠘⡧⢛⣜⡾⠁⡴⠋⠀⠀⢀⡜⠁⠀⠀⠀⠀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⡈⢣⡈⠁⣯⢾⣿⢿⣿⣳⣯⣏⣿⢷⣯⢿⣽
⢲⠡⢎⢤⡓⣏⢦⠵⣚⠖⠤⢀⡞⢀⠞⠀⠀⠀⣠⠏⠀⢠⠀⠀⠀⢠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⢠⡄⠀⠀⠀⠀⠀⠀⠘⢆⢳⡀⢷⣻⣿⣿⣿⢿⡷⣯⣿⣿⢯⣿⢿
⢣⠏⡜⢮⡵⢫⡞⣽⡹⢎⢆⡟⢀⡎⠀⠀⠀⣰⠃⠀⢀⣯⠀⠀⠀⣾⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⢺⡆⠀⠀⠀⢧⠀⠘⡆⠀⠀⠀⠀⠈⢆⢻⣣⣿⣿⣿⣿⣿⣟⣿⣷⣿⣻⣿⣿
⢡⢚⡭⢲⢭⣳⢹⢆⡻⢼⡿⠁⡜⠀⠀⠀⢰⠇⠀⠀⣸⠀⠀⡄⢠⢿⠀⠀⠀⠀⢄⢧⠀⠀⠀⠀⢸⢷⠀⠀⠀⠸⡄⠀⢱⠀⠀⠈⢦⠀⠈⡆⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣾
⡳⣮⡜⢧⠳⣌⣧⣫⣵⣿⠃⢰⠁⠀⠀⠀⡿⠀⠀⢀⡇⠀⢀⡇⣼⢸⢀⡄⠀⠀⠀⢸⡆⠀⠀⠀⣸⠸⡆⠀⠀⠀⣇⠀⠀⢻⠀⠀⢸⡆⠀⠰⠸⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿
⢣⢇⠿⣜⢧⡟⠛⠛⢛⣻⠀⡟⢠⠇⠀⢠⡇⠀⠀⣼⣃⡤⢼⠿⡟⢻⠻⡇⠀⠀⠀⢸⡇⠀⠀⠀⢻⠛⡟⠛⠧⠤⣼⣀⠀⠸⡇⠀⠀⡇⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣿
⢧⣚⡬⡙⢾⠁⢀⡴⢛⡇⠀⡇⡾⠀⠀⣸⠇⠀⠋⡿⡇⠀⢸⢀⠏⢹⠙⡇⠀⠀⠀⢸⣿⠀⠀⠀⡜⠉⢹⠀⠀⠀⡟⡆⠉⠁⣧⠀⠀⢹⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣟⣮⢵⣋⢾⡀⠏⡘⣸⠇⢰⠇⡇⠀⠀⣿⠂⠀⢠⡇⡇⠀⢼⢸⠀⢸⡀⡇⠀⠀⠀⢸⡿⠀⠀⠀⡇⠀⠈⡇⠀⠀⡅⢷⠀⠀⢻⠀⠀⠸⡄⠀⢠⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣞⠧⠿⣻⡷⠶⢾⣿⠂⣼⡆⡇⠀⠀⣿⠀⠀⢸⢀⣷⣠⣾⣸⣄⣀⣧⢷⡀⠀⠀⢸⡇⠀⠀⣸⠁⣀⣀⣽⣐⣀⣃⡸⠀⠀⡽⡇⠀⢠⡃⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣤⣶⣾⣿⡏⠀⠀⣼⠻⡄⡏⣇⢹⢀⣾⣿⣶⣷⡿⠟⣻⣿⣿⣿⣿⣿⣿⣷⣦⡀⣀⣸⣀⢀⣴⣿⣿⣿⡿⣿⣿⣿⣟⠻⢿⣶⣦⣧⣤⣸⠃⠀⠀⢨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠟⠻⠛⠿⣷⠀⢸⠃⠘⡇⠇⠸⣼⡇⣿⣿⣿⠋⢠⣾⠟⣗⣿⣿⣏⣷⡄⠙⣿⣿⡿⣿⣿⣿⡟⠙⠁⢴⣿⣿⡇⠘⡟⢿⣆⠹⣿⣿⡿⢻⠀⢀⠀⢨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠠⢡⠒⠤⠈⢧⠋⠂⣚⡇⡇⠀⢻⣧⠀⣿⣿⡀⣿⡇⠐⣾⣿⣿⣿⢿⣿⠀⠈⣿⡇⡄⢸⣿⠀⠀⢰⣾⢿⣿⣿⢀⡷⠀⣿⡜⣿⣿⠀⡼⠀⢸⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠀⡄⠈⠠⢡⠂⠀⢉⠻⣿⡇⠀⡄⠻⣆⣿⣿⡧⠻⠇⠀⣇⠈⠛⠋⠀⡟⠀⢀⣿⢷⣠⠻⣿⡀⠀⠘⣇⠈⠛⠛⣜⠇⠀⡿⢡⣿⠿⣧⠇⠀⢸⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡀⢄⠡⠐⡀⢀⠞⣩⠒⣀⡇⠈⡇⠀⠘⢯⣿⣧⠰⠀⠀⠈⠳⠤⡤⠎⠁⢀⣾⠯⠞⠁⠀⠹⣷⡀⠀⠘⠲⠤⠤⠋⠀⠘⢁⣾⡟⢨⠏⠀⠀⢸⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⡿⣼⣎
⠀⢆⡐⢈⠔⢈⠾⡡⠃⠈⡇⠀⡇⠀⠀⠀⠳⣽⣿⣦⣄⣀⣀⢀⣀⣤⣶⡿⠋⠀⠀⠀⠀⠀⠙⢿⣶⣄⣀⣀⣀⣀⣠⣶⣿⡿⠂⠀⠀⠀⠀⢸⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⡟⣿⣻
⠈⡔⢠⠈⠔⡠⢉⠳⣌⠥⡇⠀⡇⠀⠀⠀⠀⣸⢳⡉⠙⠛⠛⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⠛⠛⠋⠁⣞⢹⠀⠀⠀⠀⠀⢸⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣜⣳⢯
⡡⢜⢠⠊⡔⢡⢆⡷⢎⠀⡇⠀⡇⠀⠀⠀⠀⢸⠻⣧⠀⠀⠀⠀⠀⠀⠀⠐⢤⠤⢤⣀⡤⠤⠤⠂⠀⠀⠀⠀⠀⠀⠀⣸⢋⣹⠀⠀⠀⠀⠀⢸⠀⢸⣿⣿⣿⣿⣿⣿⢿⣷⣎⡼⣿
⢳⡌⢆⠱⣌⢣⡞⣝⢫⠿⡄⠀⡇⠀⠀⠀⠀⢸⡃⠘⣆⠀⠀⠀⠀⠀⠀⠀⠘⣄⠀⡇⠀⣰⠁⠀⠀⠀⠀⠀⠀⠀⣰⢻⠄⣾⠀⠀⠀⠀⠀⢸⠀⢸⣿⣿⣿⣿⣿⣿⢯⣿⡾⣽⣿
⡳⡜⢬⢒⡎⢳⡜⡱⢊⠽⠀⠀⡇⠀⠀⠀⠀⢸⣇⠱⣀⣓⢦⣀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠁⠀⠀⠀⠀⠀⣀⡴⠎⡡⣿⠠⣿⠀⠀⠀⠀⠀⢸⢠⢈⣿⣿⣿⣿⣿⣿⢯⣿⣟⣿⣿
⣳⡜⢣⢫⡜⣣⣜⡱⣃⢾⠀⠀⡇⠀⠀⠀⠀⠀⣿⡞⠉⠉⢻⣎⠙⡲⣤⣀⡀⠀⠀⠀⠀⠀⠀⣀⣤⣖⡫⢁⠒⣨⠔⣏⡐⣯⠀⠀⠀⠀⠀⢸⢸⠠⣿⣿⣿⣿⣿⣿⣞⣿⣿⣿⣿
⣧⢋⢧⢳⡼⣱⢮⡱⣝⢾⠀⠀⡇⠀⠀⠀⠀⠀⣿⡇⠀⠀⢸⣿⡟⠋⢿⠀⠉⠓⠢⠤⠴⠚⠉⠀⣾⡌⢉⡟⠳⣼⡍⡧⡐⡷⠀⠀⠀⢀⠀⠸⢾⠀⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿
⣯⠛⣮⢳⡞⣵⣯⡟⣼⣿⠀⢸⡇⠀⠀⠀⠀⠀⣿⡇⠀⠀⢸⡇⠙⢲⣼⠀⠀⠀⠀⠀⠀⢠⡖⠁⣿⣷⠚⠁⠀⣿⡔⣧⠘⣧⠀⠀⠀⣼⠀⢹⢸⠐⣿⣿⣿⣿⣿⣿⣾⣿⡟⣿⣿
⣯⢞⡭⣾⣵⣻⢾⡵⣿⡿⠀⣸⢧⠀⠀⠀⠀⠀⢸⡇⠀⠀⢸⡇⠀⠀⠈⠉⠒⠒⢤⣀⡤⠖⠒⠊⠉⠀⠀⠀⢰⣿⡧⣗⠨⡇⠀⠀⠀⡇⠀⢸⡸⠀⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿⣿
⣟⢮⣝⡳⣝⣾⣯⣿⢿⡇⠀⣿⣸⣀⢠⣤⠴⠶⠾⠃⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⢯⠀⠀⠀⠀⠀⠀⠀⠀⢾⣟⠷⣿⡐⡇⠀⠀⢠⡇⠀⢸⡇⡇⢸⣿⣿⣿⣿⣿⣯⣿⡝⣻⣿
⣿⣞⡾⣽⣾⣽⣿⡾⠛⢧⣴⠋⠀⠉⠙⠀⠀⠀⠀⠀⠀⠀⢸⣧⠀⠀⠀⠀⠀⠀⠀⢺⠀⠀⠀⠀⠀⠀⠀⠀⣸⠺⣟⢿⣾⡇⠀⠀⣼⡇⠀⢸⣱⣧⠸⣿⣿⣿⣿⣿⢿⣷⣹⣚⣿
⣿⣾⣽⣿⣿⣾⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠙⢦⡀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⢀⣠⠚⠁⠀⠀⠙⢲⡏⠀⢠⣿⡇⠀⣿⣾⣸⡀⣿⣿⣿⣿⣿⣿⣿⢧⣻⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠄⠀⠤⢀⠀⠈⣇⠀⠰⣈⠳⢄⠀⠀⢸⠀⠀⠤⠀⠀⠉⠀⠀⠀⠀⠀⠀⢸⠀⢀⣾⣿⡇⠀⣿⡉⢻⡃⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠈⠳⣤⣙⢦⣴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⢤⣿⣿⡇⢰⠏⡇⠘⡯⣛⢿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠁⠂⠐⠀⠀⠠⠀⠀⠀⠀⢸⡇⠀⠀⠀⠘⢯⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣧⡼⢻⣿⣿⡇⡼⠀⢱⠀⣧⠈⢳⣻⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠁⠀⡀⠄⠀⠀⠈⣷⠀⠀⠀⠀⡀⠐⠀⠐⠀⠂⠀⠉⠀⢀⠸⣿⣿⣿⡇⠀⢸⠀⢸⠀⡄⢳⣻⣿⣿⣿⣿⣿⣿
    </pre>

    <div class="flex flex-col gap-0.5">
      <div>
        <span class="text-cyan-400 font-bold">user</span>
        <span class="text-white">@</span>
        <span class="text-cyan-400 font-bold">portfolio</span>
      </div>
      <div class="text-zinc-500">-------------------</div>
      <div>
        <span class="text-cyan-400">OS:</span>
        <span class="text-white">Portfolio OS 1.0.0</span>
      </div>
      <div>
        <span class="text-cyan-400">Host:</span>
        <span class="text-white">{{ PORTFOLIO_DATA.name }}</span>
      </div>
      <div>
        <span class="text-cyan-400">Role:</span>
        <span class="text-white">{{ PORTFOLIO_DATA.role }}</span>
      </div>
      <div>
        <span class="text-cyan-400">Location:</span>
        <span class="text-white">{{ PORTFOLIO_DATA.location }}</span>
      </div>
      <div>
        <span class="text-cyan-400">Uptime:</span>
        <span class="text-white">{{ PORTFOLIO_DATA.age }} years</span>
      </div>
      <div>
        <span class="text-cyan-400">Shell:</span>
        <span class="text-white">portfolio-sh 1.0</span>
      </div>
      <div>
        <span class="text-cyan-400">CPU:</span>
        <span class="text-white">Creative Mind @ 3.2GHz</span>
      </div>
      <div>
        <span class="text-cyan-400">Memory:</span>
        <span class="text-white">Unlimited Ideas / Passion</span>
      </div>
      <div class="mt-2">
        <span class="text-cyan-400">Skills:</span>
        <span class="text-white">{{
          PORTFOLIO_DATA.skills.slice(0, 4).join(", ")
        }}</span>
      </div>
      <!-- Color palette dots -->
      <div class="mt-2 flex gap-1">
        <span
          v-for="color in paletteDots"
          :key="color"
          :class="color"
          class="w-4 h-4 inline-block"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// pakai options API buat defineComponent kalau mau, atau tetap di setup
const paletteDots = [
  "bg-zinc-900",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-white",
];
</script>
