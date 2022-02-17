import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import { pagination } from '../components/pagination.js';
import { del_product_modal } from '../components/del_product_modal.js';
import { product_modal } from '../components/product_modal.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hlin-hexschool';

let productModal = null;
let delProductModal = null;

const app = createApp({
    components: {
        pagination,
        del_product_modal,
        product_modal
    },
    data() {
        return {
            products: [],
            temp: {
                imagesUrl: []
            },
            isNew: false,
            pagination: {}
        }
    },
    methods: {
        checkAdmin() {
            // 從cookie裡面取得token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // 下次發送axios時，會自動把token夾帶到headers裡面
            axios.defaults.headers.common['Authorization'] = token;

            const api = `${url}/api/user/check`;
            axios.post(api)
                // 如果是登入狀態才允許發出this.getProducts請求，取得產品資料，並把資料推到data的products
                // 如果不是登入狀態會跳出警示，並將使用者導回登入頁面
                .then(() => {
                    this.getProducts();
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'index.html';
                })
        },
        getProducts(page = 1) {  //參數預設值，page = 1 預設會帶第一頁
            //query
            const api = `${url}/api/${path}/admin/products/?page=${page}`;
            axios.get(api)
                .then((res) => {
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'index.html';
                })
        },
        openModal(status, item) {
            if (status === 'isNew') {
                this.temp = { // 需要做清空物件的動作
                    imagesUrl: []
                };
                // 看資料是不是新增狀態
                this.isNew = true; // 改變 status 的狀態
                productModal.show();
                } else if (status === 'edit') {
                // 賦予資料
                this.temp = JSON.parse(JSON.stringify(item)); //使用深拷貝，因為item.imageUrl裡還有陣列，進行修改會有傳參考的問題
                // 看資料是不是新增狀態，因為現在是編輯，所以是false狀態
                this.isNew = false;
                // 把Modal打開，做編輯
                productModal.show();
                } else if (status === 'delete') {
                // 賦予資料，因為刪除時要拿到產品名稱
                this.temp = { ...item };
                // 不需要是因為this.isNew = false;是用來判斷新增/編輯的Modal，delete的Modal是獨立的
                delProductModal.show()
            }
        },
        updateProduct(page) {
            let api = `${url}/api/${path}/admin/product`;
            let method = 'post';
            // 根據 isNew 來判斷要串接 post 或是 put API
			// 如果this.isNew 是false狀態，就是編輯狀態
            if(!this.isNew) {
                api = `${url}/api/${path}/admin/product/${this.temp.id}`;
                method = 'put';
            }
            // 因 post 和 put 需要帶的參數相同，成功後的行為也相同（整體函式架構長一樣），所以可以寫在一起
			// axios[method] = axios.method物件取值
            // 按照API格式把資料帶進來
            axios[method](api, { data: this.temp })
                .then((res) => {
                    alert(res.data.message);
                    // 把Modal收起來
                    productModal.hide();
                    // 再取得一次資料
                    this.getProducts(page);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        delProduct(page) {
            const api = `${url}/api/${path}/admin/product/${this.temp.id}`;
            axios.delete(api)
                .then((res) => {
                    alert(res.data.message);
                    delProductModal.hide();
                    // 再取得一次資料
                    this.getProducts(page);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        }
    },
    mounted() {
        // 確認是否為登入狀態
        this.checkAdmin();
        // 使用 new 建立 bootstrap Modal，拿到實體 DOM 並賦予到變數上
        // 新增 和 編輯共用 productModal
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false     // 是否透過ESC來關閉modal
        });
        // 刪除使用 delProductModal
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
        });
        }
})
app.mount('#appProducts');