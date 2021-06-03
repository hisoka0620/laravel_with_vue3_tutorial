 <template>
    <div class="container">
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Person In Charge</th>
                    <th scope="col" :class="addClass('deadline')" @click="sortBy('deadline')">Deadline</th>
                    <th scope="col" :class="addClass('created_at')" @click="sortBy('created_at')">Created_at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task,index) in sort_tasks" :key="index">
                    <router-link :to="{ name: 'task.show', params: { taskId: task.id } }">
                        <td>{{ task.title }}</td>
                    </router-link>
                    <td>{{ task.content }}</td>
                    <td>{{ task.person_in_charge }}</td>
                    <td :class="dangerClass(task.deadline)">{{ task.deadline }}</td>
                    <td>{{ createTime(task.created_at) }}</td>
                    <td>
                        <div class="dropdown">
                            <button
                                type="button"
                                class="btn btn-secondary dropdown-toggle"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >･･･</button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button
                                    class="btn btn-primary"
                                    @click="completeTask(task.id)"
                                >Complete</button>
                                <button class="btn btn-danger" @click="deleteTask(task.id)">Delete</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="..." v-show="show">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage == 1 }">
                    <a
                        class="page-link"
                        href="#"
                        tabindex="-1"
                        @click="getTasks(currentPage - 1)"
                    >Previous</a>
                </li>
                <li
                    v-for="(page, index) in pages"
                    :key="index"
                    class="page-item"
                    :class="{ active: page == currentPage }"
                >
                    <a href="#" class="page-link" @click="getTasks(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage == lastPage }">
                    <a class="page-link" href="#" @click="getTasks(currentPage + 1)">Next</a>
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
            axios.get('/api/tasks?page=' + pageNum)
                .then((res) => {
                    this.tasks = res.data.data
                    this.pageCount = res.data.last_page
                    this.currentPage = res.data.current_page
                    this.lastPage = res.data.last_page
                })
        },
        completeTask(id) {
            axios.put(`/api/tasks/${id}`, {
                confirmed: 1
            })
                .then((res) => {
                    this.getTasks();
                });
        },
        deleteTask(id) {
            axios.delete('/api/tasks/' + id)
                .then((res) => {
                    this.getTasks();
                });
        },
        createTime(val) {
            return moment(val).tz("Asia/Tokyo").format('YYYY-MM-DD HH:mm:ss')
        },
        sortBy(key) {
            this.sort_key === key ? (this.sort_asc = !this.sort_asc) : (this.sort_asc = true)
            this.sort_key = key
        },
        addClass(key){
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
    watch: {

    },
    mounted() {
        this.getTasks(this.currentPage)
    }
}
</script>
