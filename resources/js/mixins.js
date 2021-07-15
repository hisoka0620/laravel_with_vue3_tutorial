import moment from 'moment'
import store from './store'

const myMixin = {
    methods: {
        sortBy(key) {
            if (this.sortKey == key) {
                this.sortAsc = !this.sortAsc
            }
            this.sortKey = key
        },
        addClass(key) {
            return {
                asc: this.sortKey == key && this.sortAsc,
                desc: this.sortKey == key && !this.sortAsc
            }
        },
        createTime(val) {
            return moment(val).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
        },
        hasError(val) {
            if (store.state.auth.error === null) {
                return false
            } else {
                if (val in store.state.auth.error) {
                    return true
                }
            }
        },
        errorContents(val) {
            const errorContents = store.state.auth.error[val]
            return `* ${errorContents[0]}`
        }
    },
    computed: {
        dangerClass: function () {
            return function (value) {
                const now = new Date();
                const deadlinestr = moment(value).format('YYYY-MM-DD HH:mm:ss')
                const deadline = new Date(deadlinestr);
                if (now > deadline) {
                    return {
                        'text-danger': !this.hasClass
                    }
                }
            }
        },
        sortTasks() {
            if (this.sortKey !== "") {
                let set = 1
                if (this.sortAsc) {
                    set = -1
                }
                this.tasks.sort((a, b) => {
                    if (a[this.sortKey] < b[this.sortKey]) {
                        return -1 * set
                    }
                    if (a[this.sortKey] > b[this.sortKey]) {
                        return 1 * set
                    }
                    return 0
                })
                return this.tasks
            } else {
                return this.tasks
            }
        },
        pages() {
            return this.pageCount
        },
        show() {
            return this.tasks.length > 0 ? true : false
        }
    }
}

export default myMixin
