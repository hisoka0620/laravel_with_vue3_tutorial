 <template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <div class="form-group row border-bottom">
                    <label for="id" class="col-sm-3 col-form-label">ID</label>
                    <p class="col-sm-9 my-auto text-left px-0">{{ task.id }}</p>
                </div>
                <div class="form-group row border-bottom">
                    <label for="title" class="col-sm-3 col-form-label">Title</label>
                    <p class="col-sm-9 my-auto text-left px-0">{{ task.title }}</p>
                </div>
                <div class="form-group row border-bottom">
                    <label for="content" class="col-sm-3 col-form-label">Content</label>
                    <p class="col-sm-9 my-auto text-left px-0">{{ task.content }}</p>
                </div>
                <div class="form-group row border-bottom">
                    <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                    <p class="col-sm-9 my-auto text-left px-0">{{ task.person_in_charge }}</p>
                </div>
                <div class="form-group row border-bottom">
                    <label for="deadtime" class="col-sm-3 col-form-label">Deadline</label>
                    <p class="col-sm-9 my-auto text-left px-0">{{ getDeadline }}</p>
                </div>
                <router-link
                    :to="{ name: 'task.edit', params: { taskId: taskId } }"
                    class="btn btn-success mr-1"
                >Edit</router-link>
                <button class="btn btn-secondary" @click="backTaskList">Back</button>
            </div>
        </div>
    </div>
</template>

 <script>
import moment from 'moment'

export default {
    props: {
        taskId: String
    },
    data() {
        return {
            task: {}
        }
    },
    methods: {
        getTask() {
            axios.get('/api/tasks/' + this.taskId)
                .then((res) => {
                    this.task = res.data;
                });
        },
        backTaskList() {
            this.$router.push({ name: 'task.list' });
        }
    },
    computed: {
        getDeadline: {
            get() {
                if (this.task.deadline == null) {
                    return null
                } else {
                    return moment(this.task.deadline).format('YYYY-MM-DD HH:mm')
                }
            }
        }
    },
    mounted() {
        this.getTask();
    }
}
</script>
