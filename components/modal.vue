<template>
    <Transition name="modal">
        <div class="modal" @click="$emit('close')" v-if="modalOpen">
            <div class="modal__content flex flex-col p5 gap-4 p-4 w-1/5 rounded-xl" @click.stop>
                <h2 class="text-xl text-white font-semibold">Create New Post</h2>
                <form @submit.prevent="submitPost" @keydown.enter="submitPost" class="flex flex-col gap-3" v-if="!loading">
                    <div class="modal__labels flex flex-col gap-3">
                        <label for="title" class="text-2xl text-white">Title:</label>
                        <input v-model="title" id="title" required class="rounded-xl p-2 uppercase"
                            placeholder="Title" />
                    </div>
                    <div class="modal__labels flex flex-col gap-3">
                        <label for="body" class="text-2xl text-white rounded-xl">Body:</label>
                        <textarea v-model="body" id="body" required class="rounded-xl p-2 uppercase"
                            placeholder="text"></textarea>
                    </div>
                    <div class="modal__buttons flex gap-3 mt-5">
                        <button type="submit"
                            class="uppercase p-3 bg-green-400 hover:bg-green-300 text-black rounded-xl font-semibold">Создать</button>
                        <button type="button" class="uppercase p-3 bg-red-600 hover:bg-red-500 rounded-xl font-semibold"
                            @click="$emit('close')">Отмена</button>
                    </div>
                </form>

                <!-- Throbber внутри модального окна -->
                <div v-if="loading" class="throbber">
                    <div class="modal__throbber">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/posts'
import type { Post } from '@/interfaces/interface'


const props = defineProps<{ modalOpen: boolean }>()
const emit = defineEmits<(event: 'close') => void>()

const title = ref<string>('')
const body = ref<string>('')
const store = usePostStore()

/* Загрузка состояния отправки */
const loading = ref<boolean>(false)

/* Отправка и запись данных в бд */
const submitPost = async (): Promise<void> => {
    if (title.value.length >= 3 && body.value.length >= 3) {
        loading.value = true
        store.loading = false

        // Создаем новый пост с типизацией
        const newPost: Post = {
            userId: Math.round((Math.random() * 101) + 100),
            id: Math.round((Math.random() * 101) + 100),
            title: title.value,
            body: body.value
        }

        await store.createPost(newPost)

        loading.value = false
        title.value = body.value = ''
        emit('close')
    }
}

</script>




<style></style>