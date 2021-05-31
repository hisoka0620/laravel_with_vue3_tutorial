 <template>
    <div class="container">
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Person In Charge</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Created_at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task,index) in tasks" :key="index">
                    <router-link :to="{ name: 'task.show', params: { taskId: task.id } }">
                        <td>{{ task.title }}</td>
                    </router-link>
                    <td>{{ task.content }}</td>
                    <td>{{ task.person_in_charge }}</td>
                    <td :class="dangerClass(task.deadline)">{{ task.deadline }}</td>
                    <td>{{ createTime(task.created_at) }}</td>
                    <td>
                        <div class="btn-group dropend">
                            <button
                                type="button"
                                class="btn btn-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >･･･</button>
                            <ul class="dropdown-menu">
                                <li class="pl-2 pb-1">
                                    <button
                                        class="btn btn-secondary"
                                        @click="completeTask(task.id)"
                                    >Complete</button>
                                </li>
                                <li class="pl-2">
                                    <button
                                        class="btn btn-danger"
                                        @click="deleteTask(task.id)"
                                    >Delete</button>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

 <script>
import moment from 'moment-timezone'

export default {
    data: function() {
        return {
            tasks: [],
            hasClass: false
        }
    },
    methods: {
        getTasks() {
            axios.get('/api/tasks')
                .then((res) => {
                    this.tasks = res.data
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
         createTime(val){
            return moment(val).tz("Asia/Tokyo").format('YYYY:MM:DD HH:mm:ss')
        }
    },
    mounted() {
        this.getTasks()
    }
}
</script>
