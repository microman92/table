import axios from 'axios'
import { defineStore } from 'pinia'
import type { Post } from '@/interfaces/interface'
import { ref, computed } from 'vue'

export const usePostStore = defineStore('post', () => {
    const posts = ref<Post[]>([])            // массив постов
    const loading = ref<boolean>(false)      // состояние загрузки
    const currentPage = ref<number>(1)       // текущая страница
    const itemsPerPage = 10                  // количество элементов на страницу
    const sortOrder = ref<'asc' | 'desc'>('asc') // порядок сортировки


    /* Состояние загрузки */
    const setLoading = (value: boolean) => {
        loading.value = value
    }

    // Метод для получения постов
    const getPosts = async (): Promise<void> => {
        setLoading(true)
        try {
            const { data } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
            posts.value = data
        } catch (error: any) {
            console.error('Возникла ошибка: ' + (error.message || error))
        } finally {
            setLoading(false)
        }
    }

    // Переключение вперёд по страницам
    const nextPage = (): void => {
        loading.value = true
        if (currentPage.value < totalPages.value) {
            currentPage.value++
            loading.value = false
        }
    }

    // Переключение назад по страницам
    const prevPage = (): void => {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages.value) {
            currentPage.value = pageNumber
        }
    }

    // Сортировка по ID
    const sortPosts = (): void => {
        posts.value.sort((a, b) => {
            if (sortOrder.value === 'asc') {
                return a.id - b.id
            } else {
                return b.id - a.id
            }
        })
    }

    // Переключение порядка сортировки
    const toggleSortOrder = (): void => {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
        sortPosts()
    }

    // Создание нового поста
    const createPost = async (newPost: Post): Promise<void> => {
        console.log(newPost);
        
        loading.value = true
        try {
            const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', newPost)
            posts.value.unshift(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    // Общее количество страниц
    const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage))

    // Динамическое определение столбцов таблицы
    const tableColumns = computed(() => {
        if (posts.value.length > 0) {
            return Object.keys(posts.value[0])
        }
        return []
    })

    // Пагинация постов
    const paginatedPosts = computed<Post[]>(() => {
        const start = (currentPage.value - 1) * itemsPerPage
        const end = start + itemsPerPage
        return posts.value.slice(start, end)
    })

    const pageButtonClass = (pageNumber: number) => {
        return pageNumber === currentPage.value ? 'active' : ''
    }

    return {
        posts,
        loading,
        currentPage,
        getPosts,
        nextPage,
        prevPage,
        toggleSortOrder,
        createPost,
        totalPages,
        tableColumns,
        paginatedPosts,
        goToPage,
        pageButtonClass,
        setLoading
    }
})
