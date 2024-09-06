<template>
    <div v-if="loading" class="load">
        <svg class="loader" viewBox="0 0 40 40" height="40" width="40">
            <circle class="track" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none" />
            <circle class="car" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none" />
        </svg>
    </div>

    <div class="wrapper" v-else>

        <div class="wrapper__top mb-5 flex justify-between	items-center">
            <h1 class="text-3xl text-white font-semibold uppercase">Posts</h1>
            <button @click="ModalOpen = !ModalOpen"
                class="wrapper__btn uppercase p-3 bg-green-400 hover:bg-green-300 text-black rounded-xl font-semibold">Create
                Posts</button>
        </div>
        <table class="table rounded-xl">
            <thead>
                <tr class="h-11">
                    <th class="px-2.5 text-left bg-[#61b3ff]" v-for="(column, i) in columns" :key="column"
                        @click="column == 'id' ? sortedPosts() : ''">{{ column }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="value in paginatedPost" :key="value.userId" class="h-16">
                    <td class="px-2.5 text-left"> {{ value.userId }} </td>
                    <td class="px-2.5 text-left"> {{ value.id }} </td>
                    <td class="px-2.5 text-left"> {{ value.title }} </td>
                    <td class="px-2.5 text-left"> {{ value.body }} </td>
                </tr>
            </tbody>
        </table>


        <div class="pagination" v-if="!loading">
            <div class="pagination__btns flex items-center justify-center mt-10 gap-3">
                <button
                    class="prev bg-[#c7e4ff] hover:bg-[#61b3ff] font-semibold text-md w-8 h-8 rounded-md flex justify-center items-center"
                    @click="prev()" :disabled="postStores.currentPage === 1"><img src="@/assets/img/arrow.svg"
                        alt="иконка стрелки"></button>
                <div class="pagination__btn" v-for="(btn, i) in postStores.totalPages" :key="i">
                    <button @click="postStores.goToPage(i + 1)" :class="postStores.pageButtonClass(i + 1)"
                        class="bg-[#c7e4ff] hover:bg-[#61b3ff] font-semibold text-md w-8 h-8 rounded-md">{{ btn
                        }}</button>
                </div>
                <button
                    class="next bg-[#c7e4ff] hover:bg-[#61b3ff] font-semibold text-md w-8 h-8 rounded-md flex justify-center items-center"
                    @click="next()" :disabled="currentsPages === allPages"><img src="@/assets/img/arrow.svg"
                        alt="иконка стрелки"></button>
            </div>
        </div>
    </div>


    <Modal @close="closeModal" :modalOpen="ModalOpen" />
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
const postStores = usePostStore()

onMounted(() => {
    postStores.getPosts()
})

/* Модальное окно */
const ModalOpen = ref(false)

/* состояние загрузки в pinia */
const loading = computed(() => postStores.loading)

/* Колонки таблицы */
const columns = computed(() => postStores.tableColumns)

/* Сортировка при клике */
const sortedPosts = computed(() => postStores.toggleSortOrder)
/* Отсортированные посты */
const paginatedPost = computed(() => postStores.paginatedPosts)

/* Назад кнопка */
const prev = computed(() => postStores.prevPage)

/* Вперёд кнопка */
const next = computed(() => postStores.nextPage)

/* Текущая страница */
const currentsPages = computed(() => postStores.currentPage)

/* Всего страниц */
const allPages = computed(() => postStores.totalPages)




/* Закрытие модального окна */
const closeModal = () => {
    ModalOpen.value = false
}

</script>

<style scoped></style>