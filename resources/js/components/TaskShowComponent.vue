 <template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <div class="form-group row border-bottom">
                    <label for="id" class="col-sm-3 col-form-label">ID</label>
                    <input
                        type="text"
                        class="col-sm-9 form-control-plaintext"
                        readonly
                        id="id"
                        v-model="task.id"
                    />
                </div>
                <div class="form-group row border-bottom">
                    <label for="title" class="col-sm-3 col-form-label">Title</label>
                    <input
                        type="text"
                        class="col-sm-9 form-control-plaintext"
                        readonly
                        id="title"
                        v-model="task.title"
                    />
                </div>
                <div class="form-group row border-bottom">
                    <label for="content" class="col-sm-3 col-form-label">Content</label>
                    <input
                        type="text"
                        class="col-sm-9 form-control-plaintext"
                        readonly
                        id="content"
                        v-model="task.content"
                    />
                </div>
                <div class="form-group row border-bottom">
                    <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                    <input
                        type="text"
                        class="col-sm-9 form-control-plaintext"
                        readonly
                        id="person-in-charge"
                        v-model="task.person_in_charge"
                    />
                </div>
                <div class="form-group row border-bottom">
                    <label for="deadtime" class="col-sm-3 col-form-label">Deadline</label>
                    <input
                        type="datetime-local"
                        class="col-sm-9 form-control-plaintext"
                        readonly
                        id="deadline"
                        name="deadline"
                        v-model="getDeadline"
                        min="2010-01-01T00:00"
                        max="2050-12-31T23:59"
                    />
                </div>
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
                return moment(this.task.deadline).format('YYYY-MM-DDTHH:mm')
            },
            set(value) {
                this.task.deadline = moment(value).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    },
    mounted() {
        this.getTask();
    }
}
</script>
