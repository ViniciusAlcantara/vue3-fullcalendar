<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-holder">
      <input type="text" placeholder="Event title" v-model="reminder.title" maxlength="30" />
    </div>
    <div class="input-holder">
      <date-picker :placeholder="'Start date'" v-model="reminder.start" />
    </div>
    <div class="input-holder">
      <date-picker :placeholder="'End date'" v-model="reminder.end" />
    </div>
    <div class="input-holder">
      <input type="text" placeholder="Event City" v-model="reminder.city"  />
    </div>
    <div class="input-holder">
      <button type="submit">Schedule</button>
    </div>
  </form>
</template>
<script>
import { ref } from '@vue/reactivity'

export default {
  components: {
    DatePicker
  },
  setup () {
    const reminder = ref({
      title: '',
      start: '',
      end: '',
      cssClass: '',
      city: ''
    })

    const handleSubmit = async () => {
      const start = format(reminder.value.start, 'YYYY-MM-DD')
      const end = format(reminder.value.end, 'YYYY-MM-DD')
      const reminder = {
        ...reminder.value,
        start,
        end
      }
      const req = await fetch('http://localhost:4000/schedule', {
        method: 'POST',
        body: JSON.stringify(reminder),
        headers: {
          'content-type': 'application/json'
        }
      })
      const res = await req.json()
      resetValues()
    }

    const resetValues = () => {
      reminder.value = {
        title: '',
        start: '',
        end: '',
        cssClass: '',
        data: {
          description: ''
        }
      }
    }

    return {
      reminder,
      handleSubmit
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.input-holder {
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
}
.vdp-datepicker {
  width: 100%;
}
.vdp-datepicker > div > input {
  width: 77%;
}
.input-holder > button {
  justify-self: center;
  padding: 12px 25px;
  border-radius: 0;
  text-transform: uppercase;
  font-weight: 600;
  background: orangered;
  color: white;
  border: none;
  font-size: 14px;
  letter-spacing: -0.1px;
  cursor: pointer;
}
input,
textarea {
  padding: 12px 15px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 0;
  width: 70%;
  opacity: 0.8;
  font-size: 15px;
  font-weight: normal;
}
input:focus,
textarea:focus,
button:focus {
  border: 2px solid orangered;
  outline: none;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.2);
}
</style>
