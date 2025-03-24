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
                    <div v-for="cls in classes" :key="cls.id" class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="p-6">
                            <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ cls.name }}</h2>
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
                                <button
                                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition-all">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Class } from '@/interfaces/Class';
import { getClasses } from '@/services/ClassService';

export default defineComponent({
    setup() {
        const classes = ref<Class[]>([]);
        const loading = ref(true);
        const error = ref<string | null>(null);

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

        onMounted(fetchClasses);

        return {
            classes,
            loading,
            error
        };
    }
});
</script>