<template>
    <div class="flex justify-center items-center h-screen">
        <form @submit.prevent="createClass" class="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
            <input type="text" placeholder="Name" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.name" />
            <input type="text" placeholder="Description" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.description" />
            <input type="text" placeholder="Location" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.location" />
            <input type="number" placeholder="Price" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.price" />
            <input type="number" placeholder="Duration" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.duration" />
            <div class="flex flex-col gap-2">
                <label class="text-gray-700">Start time</label>
                <DateTimePicker v-model="classData.start_time"
                    class="p-2 border-2 border-gray-500 rounded text-gray-900" format="yyyy-MM-dd HH:mm"
                    :min-date="minDate" :max-date="maxDate" :time-picker-options="{
                        start: '06:00',
                        step: '00:30',
                        end: '22:00'
                    }" />
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-gray-700">End time</label>
                <DateTimePicker v-model="classData.end_time" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                    format="yyyy-MM-dd HH:mm" :min-date="minDate" :max-date="maxDate" :time-picker-options="{
                        start: '06:00',
                        step: '00:30',
                        end: '22:00'
                    }" />
            </div>
            <input type="number" placeholder="Max participants"
                class="p-2 border-2 border-gray-500 rounded text-gray-900" v-model="classData.max_participants" />
            <button type="submit"
                class="bg-orange-500 hover:bg-orange-600 text-gray-900 px-6 py-3 rounded-full font-semibold transition-all">Create</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Class } from '@/interfaces/Class';
import { defineComponent } from 'vue';
import { me } from '@/services/AuthService';
import { createClass } from '@/services/ClassService';
import DateTimePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
    components: {
        DateTimePicker
    },
    data() {
        const now = new Date();
        const minDate = new Date();
        const maxDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        return {
            minDate,
            maxDate,
            classData: {
                name: '',
                description: '',
                location: '',
                price: 0,
                duration: 0,
                start_time: now.toISOString().slice(0, 16).replace('T', ' '),
                end_time: now.toISOString().slice(0, 16).replace('T', ' '),
                max_participants: 0
            } as Class
        };
    },
    async mounted() {
        const token = sessionStorage.getItem('userToken');
        if (!token) {
            this.$router.push({ name: 'Login' });
        }
        try {
            const user = await me();
            const userRole = user.data.role;
            if (userRole !== 'admin' && userRole !== 'god') {
                this.$router.push({ name: 'Welcome' });
            }
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async createClass() {
            try {
                const res = await createClass(this.classData);
                if (res.status === 200) {
                    this.$router.push({ name: 'Classes' });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>
