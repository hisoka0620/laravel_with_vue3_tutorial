 <template>
    <div class="container">
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Person In Charge</th>
                    <th
                        scope="col"
                        :class="addClass('deadline')"
                        @click="sortBy('deadline')"
                    >Deadline</th>
                    <th
                        scope="col"
                        :class="addClass('created_at')"
                        @click="sortBy('created_at')"
                    >Created_at</th>
                    <th scope="col">Cancellation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task,index) in sort_tasks" :key="index">
                    <td>
                        <router-link
                            :to="{ name: 'task.show', params: { taskId: task.id } }"
                        >{{ task.title }}</router-link>
                    </td>
                    <td>{{ task.content }}</td>
                    <td>{{ task.person_in_charge }}</td>
                    <td :class="dangerClass(task.deadline)">{{ task.deadline }}</td>
                    <td>{{ createTime(task.created_at) }}</td>
                    <td>
                        <button class="btn btn-danger" @click="cancelComplete(task.id)">Cancellation</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="..." v-show="show">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage == 1 }">
                    <router-link :to="{ name: 'task.complete', params: { page: currentPage - 1 } }">
                        <button
                            class="page-link"
                            tabindex="-1"
                            @click="getTasks(currentPage - 1)"
                        >Previous</button>
                    </router-link>
                </li>
                <li
                    v-for="(page, index) in pages"
                    :key="index"
                    class="page-item"
                    :class="{ active: page == currentPage }"
                >
                    <router-link :to="{ name: 'task.complete', params: { page: page } }">
                        <button class="page-link" @click="getTasks(page)">{{ page }}</button>
                    </router-link>
                </li>
                <li class="page-item" :class="{ disabled: currentPage == lastPage }">
                    <router-link :to="{ name: 'task.complete', params: { page: currentPage + 1 } }">
                        <button class="page-link" @click="getTasks(currentPage + 1)">Next</button>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

 <script>
import moment from 'moment-timezone'

export default {
    data() {
        return {
            tasks: [],
            hasClass: false,
            pageCount: '',
            currentPage: 1,
            lastPage: null,
            sort_key: "",
            sort_asc: true
        }
    },
    methods: {
        getTasks(pageNum) {
            axios.get('/api/tasks?completed=true&page=' + pageNum)
                .then((res) => {
                    this.tasks = res.data.data
                    this.pageCount = res.data.last_page
                    this.currentPage = res.data.current_page
                    this.lastPage = res.data.last_page
                })
        },
        cancelComplete(id) {
            axios.put(`/api/tasks/${id}`, {
                confirmed: 0
            })
                .then((res) => {
                    this.getTasks();
                });
        },
        createTime(val) {
            return moment(val).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
        },
        sortBy(key) {
            this.sort_key === key ? (this.sort_asc = !this.sort_asc) : (this.sort_asc = true)
            this.sort_key = key
        },
        addClass(key) {
            return {
                asc: this.sort_key === key && this.sort_asc,
                desc: this.sort_key === key && !this.sort_asc
            }
        }
    },
    computed: {
        pages() {
            return this.pageCount
        },
        show() {
            return this.tasks.length > 0 ? true : false
        },
        sort_tasks() {
            if (this.sort_key !== "") {
                let set = 1
                this.sort_asc ? (set = -1) : (set = 1)
                this.tasks.sort((a, b) => {
                    if (a[this.sort_key] < b[this.sort_key]) {
                        return -1 * set
                    }
                    if (a[this.sort_key] > b[this.sort_key]) {
                        return 1 * set
                    }
                    return 0
                })
                return this.tasks
            } else {
                return this.tasks
            }
        }
    },
    mounted() {
        this.getTasks();
    }
}
</script>
