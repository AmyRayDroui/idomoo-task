<template>
  <div
    id="idm_player"
    class="idm_player"
    :class="{ 'h-screen w-screen': props.video.videoReady }"
  ></div>
</template>

<script setup>
import axios from "axios";
import { watch, defineProps, toRef } from "vue";
const props = defineProps({
  video: Object,
  updateVideo: Function,
});
const videoRef = toRef(props, "video");
const video = videoRef.value;
watch(
  () => video.videoReady,
  () => {
    if (video.videoReady) {
      console.log(props.video.videoUrl);
      const options = {
        size: "hd",
        src: props.video.videoUrl,
      };

      window.idmPlayerCreate(options, "idm_player");
    }
  },
  { deep: true }
);

watch(
  video,
  () => {
    let interval;
    if (props.video.videoStatus) {
      const fetchData = async () => {
        try {
          const response = await axios.get(props.video.videoStatus);
          const video = {
            videoUrl: props.video.videoUrl,
            videoStatus: props.video.videoStatus,
            videoReady: response.data.status === "VIDEO_AVAILABLE",
          };
          props.updateVideo(video);
          if (props.video.videoReady) {
            clearInterval(interval);
          }
        } catch (error) {
          console.error(error);
        }
      };
      interval = setInterval(() => {
        fetchData();
      }, 1000);

      fetchData();
    }
  },
  { deep: true }
);
</script>

<style></style>
