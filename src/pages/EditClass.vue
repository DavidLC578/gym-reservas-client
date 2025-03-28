<template>
    <div class="flex justify-center items-center h-screen">
        <form @submit.prevent="editClass" class="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
            <input type="text" placeholder="Name" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.name" />
            <input type="text" placeholder="Description" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.description" />
            <input type="text" placeholder="Location" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.location" />
            <input type="text" placeholder="Price" class="p-2 border-2 border-gray-500 rounded text-gray-900"
                v-model="classData.price" @input="validatePrice" />
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
                class="bg-orange-500 hover:bg-orange-600 text-gray-900 px-6 py-3 rounded-full font-semibold transition-all">Update</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Class } from '@/interfaces/Class';
import { defineComponent, ref, onMounted } from 'vue';
import { me } from '@/services/AuthService';
import { editClass, getClass } from '@/services/ClassService';
import { useRoute } from 'vue-router';
import DateTimePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
    components: {
        DateTimePicker
    },
    setup() {
        const now = new Date();
        const minDate = new Date();
        const maxDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        const classData = ref({} as Class);
        const route = useRoute();

        // Fetch class data when component mounts
        onMounted(async () => {
            try {
                const response = await getClass(Number(route.params.id));
                classData.value = response.data;
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        });

        return {
            minDate,
            maxDate,
            classData
        };
    },
    async mounted() {
        const token = sessionStorage.getItem('userToken');
        if (!token) {
            this.$router.push({ name: 'login' });
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
        validatePrice(e: Event) {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            // Allow only numbers and decimal point
            if (!value.match(/^\d*\.?\d*$/)) {
                target.value = value.slice(0, -1);
            }
        },
        async editClass() {
            try {
                const adjustToLocalTime = (dateString: string) => {
                    const date = new Date(dateString);
                    date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Adjust to local time zone
                    return date.toISOString().slice(0, 19).replace('T', ' ');
                };

                const formattedData = {
                    ...this.classData,
                    start_time: adjustToLocalTime(this.classData.start_time),
                    end_time: adjustToLocalTime(this.classData.end_time),
                    max_participants: this.classData.max_participants
                };

                console.log('Formatted Data:', formattedData);

                const res = await editClass(this.classData.id, formattedData);
                if (res.status === 200) {
                    this.$router.push({ name: 'classes' });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
})

</script>
