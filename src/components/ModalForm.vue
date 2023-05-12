<template>
    <transition name="modal-transition">
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50" v-if="showModal">
    
          <div class="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto shadow-lg rounded-lg mt-20" @click.stop>
    
            <div class="p-4 sm:py-6 sm:px-12">
                <div class="mx-auto max-w-md bg-white border-0 sm:rounded-3xl">
                    <Form id="form" :validation-schema="schema" @submit="handleSubmit">
                        <div class="flex justify-between mb-4">
                            <h3 class="text-2xl font-bold text-slate-700 pb-2"><span v-if="type === 'add'">ADD</span> <span v-else>EDIT</span> CAR</h3>
                            <button type="reset" class="text-gray-600 hover:text-gray-800 text-3xl" @click="closeModal">&times;</button>
                        </div>
    
                    <div class="relative z-0 w-full mb-5">
                        <Field
                        type="text"
                        id="name"
                        name="name" 
                        placeholder=" "
                        class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                        v-model="formData.name"
                        />
                        <label for="name" class="absolute duration-300 top-3 origin-0 text-gray-500">Name</label>
                        <ErrorMessage class="text-red-600 text-sm" name="name"/>
                    </div>
    
                    <div class="relative z-0 w-full mb-5">
                        <Field v-slot="{ field }" name="details" v-model="formData.details"> 
                            <textarea
                            v-bind="field"
                            name="details"
                            placeholder=" "
                            rows="3"
                            class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                            />
                        </Field>
                        <label for="email" class="absolute duration-300 top-3 origin-0 text-gray-500">Detail</label>
                        <ErrorMessage class="text-red-600 text-sm" name="details"/>
                    </div>
    
                    <div class="relative z-0 w-full mb-5">
                        <Field
                        id="image"
                        name="image"
                        placeholder=" "
                        class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                        v-model="formData.image"
                        />
                        <label for="image" class="absolute duration-300 top-3 origin-0 text-gray-500">Image URL</label>
                        <ErrorMessage class="text-red-600 text-sm" name="image"/>
                    </div>
    

                    <div class="relative z-0 w-full mb-5">
                        <Field
                        type="number"
                        id="price"
                        name="price"
                        placeholder=" "
                        class="text-slate-800 pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                        v-model="formData.price"
                        />
                        <div class="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
                        <label for="price" class="absolute duration-300 top-3 left-5 origin-0 text-gray-500">Car Price</label>
                        <ErrorMessage class="text-red-600 text-sm" name="price"/>
                    </div>
    
                    <div class="mt-4 flex justify-end">
                        <button v-if="type === 'add'" class="px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Save</button>
                        <button v-else class="px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Update</button>
                        <button type="reset" class="bg-gray-300 text-gray-800 font-bold py-2 px-4 ml-2 rounded" @click="closeModal">Cancel</button>
                    </div>
    
                    </Form>
                </div>
                </div>
          </div>
        </div>
      </transition>
</template>


<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default {
        name: "ModalForm",
        props: ['showModal', 'type', 'car'],
        emits: ['hide-modal', 'update-cars'],
        data() {
            return {
                formData: {},
                schema: {
                    name: "required|min:3|max:50",
                    details: "required|min:30|max:120",
                    image: "required|url",
                    price: "required|numeric|min_value:100|max_value:10000000"
                },
                alertTitle: null,
            };
        },
        methods: {
            closeModal() {
                this.$emit('hide-modal');
            },
            handleSubmit() {
                if (this.type === 'add') {
                    axios
                    .post("https://testapi.io/api/dartya/resource/cardata", this.formData)
                    .then(response => { 
                        if (response.status === 201) {
                            this.notify();

                            this.$emit('update-cars');
                            this.closeModal();
                        }
                    })
                    .catch(err => { alert(err) });
                }
                else {
                    axios.put(`https://testapi.io/api/dartya/resource/cardata/${this.car.id}`, this.formData)
                    .then(response => {
                        if (response.status === 200) {
                            this.notify();
                            
                            this.$emit('update-cars');
                            this.closeModal();
                        }
                    })
                    .catch(err => { alert(err) });
                }
            },
            notify() {
                Swal.fire({
                    title: `Car ${this.alertTitle}!`,
                    html: `
                        <br/>
                        <img src="${this.formData.image}" alt="Car Image" width="225" height="225" style="margin: auto" />
                        <br/>
                        <strong>Name:</strong> ${this.formData.name} <br/>
                        <strong>Details:</strong> ${this.formData.details} <br/>
                        <strong>Price:</strong> $${this.formData.price} <br/>
                    `, 
                    confirmButtonText: "Done!",
                    confirmButtonColor: "#475569",
                });
            }
        },
        watch: {
            car: {
                handler(newValue) {
                    this.formData = {...newValue}
                },
                immediate: true
            },
            type: {
                handler(newValue) {
                    if (newValue === 'add')
                        this.alertTitle = 'Created';
                    else
                        this.alertTitle = 'Updated';
                },
                immediate: true
            }
        }
    }
</script>


<style scoped>

    .modal-transition-enter-active,
    .modal-transition-leave-active {
    transition: opacity 0.3s ease;
    }

    .modal-transition-enter,
    .modal-transition-leave-to {
    opacity: 0;
    }

  .origin-0 {
    transform-origin: 0%;
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label,
  textarea:focus ~ label,
  textarea:not(:placeholder-shown) ~ label,
  select:focus ~ label,
  select:not([value='']):valid ~ label {
    /* @apply transform; scale-75; -translate-y-6; */
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    --tw-scale-x: 0.75;
    --tw-scale-y: 0.75;
    --tw-translate-y: -1.5rem;
  }

  input:focus ~ label,
  select:focus ~ label,
  textarea:focus ~ label {
    /* @apply text-black; left-0; */
    --tw-text-opacity: 1;
    color: rgba(51, 65, 85, var(--tw-text-opacity));
    left: 0px;
    z-index: 1000;
  }

</style>
