<template>
    <div class="row">
        <div class="col col-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="row">
                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Company Name</label>
                                        <input type="text" v-model="name" name="companyName" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">CIN</label>
                                        <input type="text" v-model="cin" name="companyName" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Email</label>
                                        <input type="email" name="companyName" v-model="email" class="form-control" />
                                    </div>
                                </div>
                            </div>


                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Class</label>
                                        <select type="select" name="companyClass" v-model="companyClass"
                                            class="form-select">
                                            <option :key="key" v-for="(option, key) in companyClasses">
                                                {{ option.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Category</label>
                                        <select type="select" v-model="category" name="status" class="form-select">
                                            <option :key="key" v-for="(option, key) in categories">
                                                {{ option.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Sub Category</label>
                                        <select type="select" name="status" v-model="subCategory" class="form-select">
                                            <option :key="key" v-for="(option, key) in subCategories">
                                                {{ option.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Roc</label>
                                        <select type="select" v-model="roc" name="status" class="form-select">
                                            <option :key="key" v-for="(option, key) in rocs">
                                                {{ option.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Status</label>
                                        <select type="select" v-model="status" name="status" class="form-select">
                                            <option :key="key" v-for="(option, key) in statuses">
                                                {{ option.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Authorized Capital</label>
                                        <input type="number" min="0" name="authorizedCapital"
                                            v-model="authorisedCapital" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Paid Up Capital</label>
                                        <input type="number" min="0" name="paidUpCapital" v-model="paidUpCapital"
                                            class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Country</label>
                                        <input type="text" name="country" v-model="country" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">State</label>
                                        <input type="text" name="state" v-model="state" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-4">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Pin</label>
                                        <input type="number" minlength="100000" maxlength="100000" v-model="pin" min="0"
                                            name="pin" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="col col-12 col-md-3 col-lg-8">
                                <div class="form-group">
                                    <div class="from-control">
                                        <label class="form-label">Address</label>
                                        <textarea class="form-control" v-model="address" rows="2" name="address" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <button class="btn btn-primary me-3" type="submit">{{ mode === 'add' ? 'Add' : 'Save'
                            }}</button>
                        <button type="button" class="btn btn-dark">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const route = useRoute();
const router = useRouter();
const name = ref('');
const cin = ref('');
const email = ref('');
const roc = ref('');
const status = ref('');
const companyClass = ref('');
const category = ref('');
const subCategory = ref('');
const authorisedCapital = ref('');
const paidUpCapital = ref('');
const country = ref('');
const state = ref('');
const pin = ref('');
const address = ref('');

onMounted(() => {
    store.dispatch('fetchCategories');
    store.dispatch('fetchRocs');
    store.dispatch('fetchSubCategories');
    store.dispatch('fetchCompanyStatuses');
    store.dispatch('fetchCompanyClasses');
})

// Compute mode (add or edit) based on route
const mode = computed(() => {
    if (route.name === 'addCompany') {
        return 'add';
    } else if (route.name === 'editCompany') {
        return 'edit';
    }
    return 'add';
});

console.log('mode', mode);


const categories = computed(() => store.getters.getCategories);
const statuses = computed(() => store.getters.getCompanyStatuses);
const subCategories = computed(() => store.getters.getSubCategories);
const companyClasses = computed(() => store.getters.getCompanyClasses);
const rocs = computed(() => store.getters.getRocs);
const client = computed(() => store.getters.getSingleClient);
console.log(client.value, 'client');

watch(mode.value, (newV) => {
    console.log(newV, 'new modo');
})

if (mode.value === 'edit') {
    const id = ref(route.params.id);
    console.log(id.value, ' id to fetch');
    store.dispatch('fetchSingleClient', id.value);
}

watch(() => client.value, (newC) => {
    console.log(newC, 'new');
    setFormValues();
}, { deep: true });

const setFormValues = () => {
    console.log(client.value, 'client here');
    name.value = client.value._source.name;
    cin.value = client.value._source.cin;
    email.value = client.value._source.email;
    companyClass.value = client.value._source.class;
    status.value = client.value._source.status;
    category.value = client.value._source.category;
    subCategory.value = client.value._source.subCategory;
    roc.value = client.value._source.roc;
    paidUpCapital.value = client.value._source.paidUpCapital;
    authorisedCapital.value = client.value._source.authorisedCapital;
    country.value = client.value._source.country;
    state.value = client.value._source.state;
    pin.value = client.value._source.pin;
    address.value = client.value._source.address;

}

const handleSubmit = () => {
    const categoryId = categories.value.find((cat) => cat.name === category.value)['id'];
    const subCategoryId = subCategories.value.find((cat) => cat.name === subCategory.value)['id'];
    const classId = companyClasses.value.find((cl) => cl.name === companyClass.value)['id'];
    const statusId = statuses.value.find((st) => st.name === status.value)['id'];
    const rocId = rocs.value.find((r) => r.name === roc.value)['id'];

    console.log(categoryId, subCategoryId, classId, statusId, rocId, ' data ids');
    const data = {
        name: name.value,
        status: status.value,
        roc: roc.value,
        cin: cin.value,
        category: category.value,
        subCategory: subCategory.value,
        class: companyClass.value,
        authorisedCapital: authorisedCapital.value,
        paidUpCapital: paidUpCapital.value,
        state: state.value,
        pin: pin.value,
        country: country.value,
        address: address.value,
        email: email.value,
        rocId,
        categoryId,
        subCategoryId,
        statusId,
        classId
    };
    console.log(data, 'data to send');
    if (mode.value === 'add') {
        console.log(data, 'data to send');
        store.dispatch('addClient', data);

    } else if (mode.value === 'edit') {
        const id = ref(route.params.id);

        store.dispatch('updateClient', { ...data, id: id.value }).then(() => {

        })
    }
    Swal.fire({
        icon: 'success',
        text: `Client ${mode.value === 'add' ? 'Added' : 'Updated'} successfully !`,
        showConfirmButton: true
    }).then(() => {
        router.push('/');
    })
};
</script>