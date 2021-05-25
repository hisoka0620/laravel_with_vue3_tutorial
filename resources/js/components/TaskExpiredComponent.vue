 <template>
    <div class="container">
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Person In Charge</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Show</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Cancellation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task,index) in tasks" :key="index">
                    <th scope="row">{{ task.id }}</th>
                    <td>{{ task.title }}</td>
                    <td>{{ task.content }}</td>
                    <td>{{ task.person_in_charge }}</td>
                    <td :class="classObject(task.deadline)">{{ task.deadline }}</td>
                    <td>
                        <router-link :to="{ name: 'task.show', params: { taskId: task.id } }">
                            <button class="btn btn-primary">Show</button>
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{ name: 'task.edit', params: { taskId: task.id } }">
                            <button class="btn btn-success">Edit</button>
                        </router-link>
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="cancelComplete(task.id)">Cancellation</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

 <script>
import moment from 'moment'

export default {
    data: function() {
        return {
            tasks: [],
            hasClass: false
        }
    },
    methods: {
        getTasks() {
            axios.get('/api/tasks?deadline=true')
                .then((res) => {
                    this.tasks = res.data
                })
        },
        cancelComplete(id) {
            axios.put(`/api/tasks/${id}`, {
                confirmed: 0
            })
                .then((res) => {
                    this.getTasks();
                });
        }
    },
    computed: {
        classObject: function() {
            return function(value) {
                const timezone = new Date();
                const year = timezone.getFullYear();
                const month = timezone.getMonth() + 1;
                const day = timezone.getDate();
                const hours = timezone.getHours();
                const minutes = timezone.getMinutes();
                const currentTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                const formatNow = moment(currentTime).format('yyyy-MM-DD HH:mm');
                if (formatNow > value) {
                    return {
                        'text-danger': !this.hasClass
                    }
                }
            }
        }
    },
    mounted() {
        this.getTasks()
    }
}
</script>
