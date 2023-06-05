<template>
  <div class="flex items-center mx-auto">
    <MainCard
      v-if="!video.videoReady"
      :video="video"
      :update-video="updateVideo"
    />
    <VideoPlayer :video="video" :update-video="updateVideo" />
  </div>
</template>

<script setup>
//import HelloWorld from "./components/HelloWorld.vue";
import { reactive } from "vue";
import MainCard from "./components/MainCard.vue";
import VideoPlayer from "./components/VideoPlayer.vue";

let video = reactive({
  videoUrl: "",
  videoStatus: "",
  videoReady: false,
});
const updateVideo = (updatedVideo) => {
  Object.assign(video, updatedVideo);
  console.log(video);
};
</script>

<style></style>
