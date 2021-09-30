const baseUrl = "https://anbo-restbookquerystring.azurewebsites.net/api/books"

Vue.createApp({
    data() {
        return {
            Books: [],
            titleToGetBy: "",
            idToGetBy: -1,
            singleBook: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { title: "", price: 0},
            addMessage: "",
            updateData: { id: "", title: "", price: 0},
            updateMessage: "",
        }

    },
    methods: {
        getAllBooks() {
            this.helperGetAndShow(baseUrl)
        },
        getByTitle(title) {
            const url = baseUrl + "?title=" + title
            this.helperGetAndShow(url)
        },
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.Books = await response.data
            } catch(ex) {
                alert(ex.message)
            }
        },
        async getById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleBook = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteBook(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllBooks()
            } catch(ex) {
                alert(ex.message)
            }
        },
        async addBook() {
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response" + response.status + " " + response.statusText
                this.getAllBooks()
            } catch(ex) {
                alert(ex.message)
            }
        },
        async updateBook() {
            const url = baseUrl + "/" + this.updateData.id
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response" + response.status + " " + response.statusText
                this.getAllBooks()
            } catch(ex) {
                alert(ex.message)
            }
        }

    }
}).mount("#app")