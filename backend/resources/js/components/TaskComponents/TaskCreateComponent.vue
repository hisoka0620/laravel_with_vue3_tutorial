 <template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form @submit.prevent="submit">
                    <div class="form-group row">
                        <label for="title" class="col-sm-3 col-form-label">Title</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="title"
                            v-model="task.title"
                        />
                    </div>
                    <div class="form-group row">
                        <label for="content" class="col-sm-3 col-form-label">Content</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="content"
                            v-model="task.content"
                        />
                    </div>
                    <div class="form-group row">
                        <label
                            for="person-in-charge"
                            class="col-sm-3 col-form-label"
                        >Person In Charge</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="person-in-charge"
                            v-model="task.person_in_charge"
                        />
                    </div>
                    <div class="form-group row">
                        <label
                            for="deadtime"
                            class="col-sm-3 col-form-label"
                        >Deadline</label>
                        <input
                            type="datetime-local"
                            class="col-sm-9 form-control"
                            id="deadtime"
                            v-model="task.deadline"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button class="btn btn-secondary" @click="createCancel">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

 <script>
export default {
    data() {
        return {
            task: {}
        }
    },
    methods: {
        submit() {
            axios.post('/api/tasks', this.task)
                .then(() => {
                    this.$router.push({ name: 'task.list' });
                }).catch(error => console.log(error.response));
        },
        createCancel() {
            this.$router.push({ name: 'task.list' });
        }
    }
}
</script>
