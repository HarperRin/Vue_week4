export const product_modal = {
    props: ['temp', 'is-new', 'page'],
    template:`
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="mb-2">
                        <div class="mb-3">
                            <label for="imageUrl" class="form-label">輸入主要圖片網址</label>
                            <input type="text" class="form-control"
                            v-model="temp.imageUrl" placeholder="請輸入圖片連結">
                        <img class="img-fluid" :src="temp.imageUrl" alt="">
                        </div>
                        <h3 class="mb-3">多圖新增</h3>
                        <div v-if="Array.isArray(temp.imagesUrl)">
                            <template v-for="(img, key) in temp.imagesUrl" :key="key">
                                <div class="form-group mb-3">
                                    <label for="imagesUrl" class="mb-2">圖片網址</label>
                                    <input v-model="temp.imagesUrl[key]" type="text" class="form-control" id="imagesUrl"
                                        placeholder="請輸入圖片連結">
                                </div>
                                <img :src="img" alt="" class="img-fluid mb-3">
                            </template>
                            <div v-if="!temp.imagesUrl.length || temp.imagesUrl[temp.imagesUrl.length-1]">
                                <button class="btn btn-outline-primary btn-sm d-block w-100"
                                @click="temp.imagesUrl.push('')">
                                新增圖片
                                </button>
                            </div>
                            <div v-else>
                                <button class="btn btn-outline-danger btn-sm d-block w-100"
                                @click="temp.imagesUrl.pop()">
                                刪除圖片
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <button class="btn btn-outline-primary btn-sm d-block w-100"
                            @click="createImg">
                                新增圖片
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" v-model="temp.title" class="form-control" placeholder="請輸入標題">
                </div>

                <div class="row">
                    <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" v-model="temp.category" type="text" class="form-control"
                    placeholder="請輸入分類">
                    </div>
                    <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" v-model="temp.unit" type="text" class="form-control" placeholder="請輸入單位">
                    </div>
                </div>

                <div class="row">
                    <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" v-model.number="temp.origin_price" 
                    type="number" min="0" class="form-control" placeholder="請輸入原價">
                    </div>
                    <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" v-model.number="temp.price" type="number" 
                    min="0" class="form-control" placeholder="請輸入售價">
                    </div>
                </div>
                <hr>
                <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" v-model="temp.description" type="text" class="form-control"
                    placeholder="請輸入產品描述">
                    </textarea>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                    v-model="temp.content" placeholder="請輸入說明內容">
                    </textarea>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox"
                    v-model="temp.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-primary" @click="$emit('update-product', page.current_page)">
                確認
            </button>
            </div>
        </div>
    </div>`,
    methods: {
        createImg() {
            this.temp.imagesUrl = [];
            this.temp.imagesUrl.push('');
        }
    }
}