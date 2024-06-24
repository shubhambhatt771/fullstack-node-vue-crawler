<template>
    <div class="row">
        <div class="col col-12 col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="d-inline">{{ company.name }}</h5>
                    <RouterLink :to="{ name: 'editCompany', params: { id: 1 } }" class="btn btn-primary"
                        name="edit-btn">Edit
                    </RouterLink>
                </div>
                <div class="card-body">
                    <article>
                        <p>
                            {{ company.name }} is a {{ company.roc }} based {{ company.class }} LIMITED company,
                            Registered
                            at
                            dated 17-DEC-2014 on Ministry of Corporate Affairs(MCA), The Corporate Identification Number
                            (CIN) of AWFIS SPACE SOLUTIONS PRIVATE LIMITED is {{ company.cin }}.
                        </p>
                        <p>
                            It has been classified as <b>{{ company.category }} </b> and is registered under Registar of
                            Companies DELHI India. Authorized share capital of <b> {{ company.name }} </b> is
                            Rs.
                            <b>{{ company.authorisedCapital }} </b> and its paid up capital is Rs. <b> {{
                                company.paidUpCapital }} </b>.
                        </p>
                        <p>
                            Its Annual General Meeting (AGM) was lastly conducted on 2015-03-31 and as per the records
                            of
                            Ministry of Corporate Affairs (MCA), its balance sheet was last filed on {{
                                company.registrationDate }}.
                        </p>
                        <p>
                            The registered Email address of AWFIS SPACE SOLUTIONS PRIVATE LIMITED is
                            {{ company.email }}
                            and its registered address is {{ company.address }} {{ company.state }} {{ company.pin }}.
                        </p>
                        <p>
                            The current status of AWFIS SPACE SOLUTIONS PRIVATE LIMITED shows as <span
                                :class="[company.status === 'ACTIVE' ? 'text-success' : 'text-danger']">{{
                                    company.status }}</span>
                        </p>
                    </article>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Basic Details</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Company Name</b></span>
                            <span>{{ company.name }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Roc</b></span>
                            <span>{{ company.roc }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Company Status</b></span>
                            <span>{{ company.status }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> CIN</b></span>
                            <span>{{ company.name }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Registration Date</b></span>
                            <span>{{ company.registrationDate }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Category </b></span>
                            <span>{{ company.category }}</span>
                        </div>

                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Sub Category</b></span>
                            <span>{{ company.subCategory }}</span>
                        </div>

                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Company Class</b></span>
                            <span>{{ company.class }}</span>
                        </div>

                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Authorised Capital</b></span>
                            <span>{{ company.authorisedCapital }}</span>
                        </div>

                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> PaidUp Capital</b></span>
                            <span>{{ company.paidUpCapital }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Contact Details</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> State</b></span>
                            <span>{{ company.state }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> PIN Code</b></span>
                            <span>{{ company.pin }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Country</b></span>
                            <span>{{ company.country }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-start">
                            <span class="me-3"><b> Address</b></span>
                            <span>{{ company.address }}</span>
                        </div>
                        <div class="d-flex justify-content-start align-items-center">
                            <span class="me-3"><b> Email</b></span>
                            <span>{{ company.email }}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, computed, watch, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();
const id = ref(route.params.id);

onMounted(() => {
    store.dispatch('fetchSingleClient', id.value);
})

watch(() => route.params.id, (newId) => {
    if (newId != id.value) {
        id.value = newId;
        store.dispatch('fetchSingleClient', newId)
    }
});

const company = computed(() => store.state.client._source);


</script>