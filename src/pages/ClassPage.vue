<template>
    <div class="min-h-screen flex flex-col">
        <div class="flex-grow">
            <div class="container mx-auto px-4 py-8">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">Classes</h1>
                    <router-link :to="{ name: 'create-class' }"
                        class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all">
                        Create New Class
                    </router-link>
                </div>

                <div v-if="loading" class="flex justify-center items-center min-h-[300px]">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>

                <div v-else-if="error" class="text-red-500 text-center py-8">
                    Error loading classes: {{ error }}
                </div>

                <div v-else-if="!classes.length" class="text-gray-500 text-center py-8">
                    No classes found
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="cls in classes" :key="cls.id"
                        class="bg-white rounded-lg shadow-md overflow-hidden relative">
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-4">
                                <h2 class="text-xl font-semibold text-gray-900">{{ cls.name }}</h2>
                                <button @click="deleteClass(cls.id)"
                                    class="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors absolute top-4 right-4"
                                    title="Delete class">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <p class="text-gray-600 mb-4">{{ cls.description }}</p>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <span class="block text-sm text-gray-500">Location</span>
                                    <span class="block text-gray-900">{{ cls.location }}</span>
                                </div>
                                <div>
                                    <span class="block text-sm text-gray-500">Price</span>
                                    <span class="block text-gray-900">${{ cls.price }}</span>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div>
                                    <span class="block text-sm text-gray-500">Duration</span>
                                    <span class="block text-gray-900">{{ cls.duration }} minutes</span>
                                </div>
                                <div>
                                    <span class="block text-sm text-gray-500">Participants</span>
                                    <span class="block text-gray-900">{{ cls.max_participants }} max</span>
                                </div>
                            </div>
                            <div class="mt-4 flex justify-between items-center">
                                <span class="text-sm text-gray-500">
                                    {{ new Date(cls.start_time).toLocaleString() }} -
                                    {{ new Date(cls.end_time).toLocaleString() }}
                                </span>
                                <button @click="openBookingModal(cls)"
                                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition-all">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Booking Modal -->
        <div v-if="selectedClass" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-96 relative">
                <h2 class="text-xl font-bold mb-4">Book Class</h2>
                <p class="text-gray-600 mb-4">Class: {{ selectedClass.name }}</p>
                <p class="text-gray-600 mb-4">Price: ${{ selectedClass.price }}</p>

                <div class="mt-6 flex justify-end space-x-4">
                    <button @click="closeBookingModal"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button @click="handleBooking(selectedClass.id)"
                        class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Class } from '@/interfaces/Class';
import { getClasses, deleteClassById, createBooking } from '@/services/ClassService';

export default defineComponent({
    setup() {
        const classes = ref<Class[]>([]);
        const loading = ref(true);
        const error = ref<string | null>(null);
        const selectedClass = ref<Class | null>(null);

        const fetchClasses = async () => {
            try {
                loading.value = true;
                const response = await getClasses();
                classes.value = response.data;
                error.value = null;
            } catch (err) {
                error.value = err instanceof Error ? err.message : 'An error occurred';
            } finally {
                loading.value = false;
            }
        };

        const openBookingModal = (cls: Class) => {
            selectedClass.value = cls;
        };

        const closeBookingModal = () => {
            selectedClass.value = null;
        };

        const handleBooking = async (classId: number) => {
            try {
                const res = await createBooking(classId);
                console.log(res);
            } catch (error) {
                console.error(error);
            }
            closeBookingModal();
            await fetchClasses();
        };

        const deleteClass = async (classId: number) => {
            try {
                await deleteClassById(classId);
                await fetchClasses();
            } catch (err) {
                error.value = err instanceof Error ? err.message : 'Failed to delete class';
            }
        };

        onMounted(fetchClasses);

        return {
            classes,
            loading,
            error,
            deleteClass,
            selectedClass,
            openBookingModal,
            closeBookingModal,
            handleBooking
        };
    }
});
</script>