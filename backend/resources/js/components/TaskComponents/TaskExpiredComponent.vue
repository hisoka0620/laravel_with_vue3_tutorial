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
                        class="sort"
                        :class="addClass('deadline')"
                        @click="sortBy('deadline')"
                    >Deadline</th>
                    <th
                        scope="col"
                        class="sort"
                        :class="addClass('created_at')"
                        @click="sortBy('created_at')"
                    >Created_at</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task,index) in sortTasks" :key="index">
                    <router-link :to="{ name: 'task.show', params: { taskId: task.id } }">
                        <td>{{ task.title }}</td>
                    </router-link>
                    <td>{{ task.content }}</td>
                    <td>{{ task.person_in_charge }}</td>
                    <td :class="dangerClass(task.deadline)">{{ task.deadline }}</td>
                    <td>{{ createTime(task.created_at) }}</td>
                    <td>
                        <button class="btn btn-danger" @click="deleteExpired(task.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="..." v-show="show">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage == 1 }">
                    <router-link :to="{ name: 'task.expired', params: { page: currentPage - 1 } }">
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
                    <router-link :to="{ name: 'task.expired', params: { page: page } }">
                        <button class="page-link" @click="getTasks(page)">{{ page }}</button>
                    </router-link>
                </li>
                <li class="page-item" :class="{ disabled: currentPage == lastPage }">
                    <router-link :to="{ name: 'task.expired', params: { page: currentPage + 1 } }">
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
    data: function() {
        return {
            tasks: [],
            hasClass: false,
            pageCount: '',
            currentPage: 1,
            lastPage: null,
            sortKey: "",
            sortAsc: true
        }
    },
    methods: {
        getTasks(pageNum) {
            axios.get('/api/tasks?deadline=true&page=' + pageNum)
                .then((res) => {
                    this.tasks = res.data.data
                    this.pageCount = res.data.last_page
                    this.currentPage = res.data.current_page
                    this.lastPage = res.data.last_page
                })
        },
        deleteExpired(id) {
            axios.delete(`/api/tasks/${id}`)
                .then((res) => {
                    this.getTasks();
                });
        }
    },
    mounted() {
        this.getTasks()
    }
}
</script>
