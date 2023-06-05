<template>
  <section class="flex flex-col mx-auto">
    <h1 class="m-0 text-4xl mb-6">Transcript</h1>
    <form
      @submit.prevent="handleSubmit"
      class="bg-cardBg min-w-52 min-h-52 rounded-2xl px-4 py-10 flex flex-col"
    >
      <p class="mb-10">
        Enter the details below in order to generate your video
      </p>
      <div class="grid md:grid-cols-2 gap-x-0.5 gap-y-6">
        <div
          v-for="(value, key) in fields"
          :key="key"
          class="flex flex-col gap-y-2"
          :class="{
            'col-span-full': /address/i.test(key),
            'container-input': /name/i.test(key),
          }"
        >
          <div class="flex gap-x-1.5">
            <img
              v-if="/name/i.test(key)"
              src="../assets/person.svg"
              class="h-5"
            />
            <img
              v-else-if="/email/i.test(key)"
              src="../assets/at.svg"
              class="h-5"
            />
            <img
              v-else-if="/Address/i.test(key)"
              src="../assets/mailbox.svg"
              class="h-5"
            /><label :for="key">{{ labelTexts[key] }}</label>
          </div>
          <input
            v-model="fields[key]"
            :id="key"
            class="bg-inputBg w-full p-3"
            :class="{
              'rounded-lg': /address/i.test(key) || /last/i.test(key),
              'rounded-lg md:rounded-r-none': /first/i.test(key),
              'rounded-lg md:rounded-l-none': /middle/i.test(key),
            }"
          />
        </div>
      </div>
      <div class="flex mt-4">
        <div v-for="(value, key) in imageFields" :key="key">
          <label :for="key">{{ key }}</label>
          <picture-input
            v-model="imageFields[key]"
            :width="150"
            :removable="true"
            removeButtonClass="ui red button"
            :height="150"
            accept="image/jpeg, image/png, image/gif"
            buttonClass="ui button primary"
            :customStrings="{
              upload: '<h1>Upload it!</h1>',
              drag: 'Drag and drop your image here',
            }"
          >
          </picture-input>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-x-4 mt-6 w-full">
        <FormSelect
          id="videoFormat"
          labelText="Format"
          v-model="videoFormat"
          :options="['hls', 'mp4']"
        />
        <FormSelect
          id="quality"
          labelText="Quality"
          v-model="quality"
          :options="['Good', 'Better', 'Best']"
        />
        <FormSelect
          id="resolution"
          labelText="Resolution"
          v-model="resolution"
          :options="['100%', '66.67%', '50%']"
        />
      </div>
      <button
        type="submit"
        class="px-10 py-2 bg-light text-blue rounded-lg font-bold mt-4 shadow-lg self-end"
      >
        Generate
      </button>
    </form>
  </section>
</template>

<script setup>
import api from "@/api/mainApi";
import { camelize } from "@/utils/state.js";
import { reactive, defineProps } from "vue";
import PictureInput from "vue-picture-input";
import FormSelect from "./form/FormSelect.vue";

const props = defineProps({
  video: Object,
  updateVideo: Function,
});
let fields = reactive({});
let imageFields = reactive({});
let videoFormat = "hls";
let quality = "Good";
let resolution = "100%";
let labelTexts = {};
async function fetchFormData() {
  try {
    const response = await api.getFormProperties();
    const data = await response.data;
    if (data && data.length > 0) {
      data.forEach((field) => {
        if (/image/i.test(field.description)) {
          imageFields[camelize(field.key)] = "";
        } else {
          fields[camelize(field.key)] = "";
          labelTexts[camelize(field.key)] = field.key;
        }
      });
    }
  } catch (error) {
    console.error("Error fetching form data:", error);
  }
}
fetchFormData();

async function handleSubmit() {
  let data = [];
  for (const [key, value] of Object.entries(fields)) {
    data.push({ key: labelTexts[key], value });
  }
  for (const [key, value] of Object.entries(imageFields)) {
    data.push({ key: key, value });
  }

  const req = {
    storyboard_id: 31193,
    output: {
      video: [
        {
          height:
            resolution === "100%" ? 720 : resolution === "66.67%" ? 480 : 360,
          video_type: videoFormat,
          quality: quality === "Best" ? 35 : quality === "Better" ? 30 : 26,
          landing_page_id: null,
        },
      ],
    },
    data,
  };
  const res = await api.generateVideo(req);
  const video = {
    videoUrl: res.output.video[0].links.url,
    videoStatus: res.output.video[0].links.check_status_url,
    videoReady: false,
  };
  props.updateVideo(video);
}
</script>

<style></style>
