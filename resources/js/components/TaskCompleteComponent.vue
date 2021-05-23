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
                    <td>{{ task.deadline }}</td>
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
export default {
    data: function() {
        return {
            tasks: []
        }
    },
    methods: {
        getTasks() {
            axios.get('/api/tasks?completed=true')
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
    mounted() {
        this.getTasks()
    }
}
</script>
