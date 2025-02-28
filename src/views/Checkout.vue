<script setup lang="ts">
import { computed, ref } from "vue";
import { useCart } from "@/composables/useCart";
import { useOrderStore } from "@/stores/useOrderStore";
import { useRouter } from "vue-router";
import type { OrderInfo } from "@/types/food";
import InputField from "@/components/UI/InputField.vue";
import OrderSummary from "@/components/checkout/OrderSummary.vue";
import Button from "@/components/UI/Button.vue";

const { cartItems, total } = useCart();
const router = useRouter();

const shippingInfo = ref({
  name: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  country: "",
});

const errors = ref({
  name: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  country: "",
});

// Validation rules
const validateField = (field: string, value: string) => {
  switch (field) {
    case "name":
      errors.value.name = value.trim() ? "" : "Name is required";
      break;
    case "phone":
      if (!value.trim()) {
        errors.value.phone = "Phone number is required";
      } else if (!/^\d{8,15}$/.test(value)) {
        errors.value.phone = "Phone number must be 8-15 digits";
      } else {
        errors.value.phone = "";
      }
      break;
    case "address":
      errors.value.address = value.trim() ? "" : "Address is required";
      break;
    case "city":
      errors.value.city = value.trim() ? "" : "City is required";
      break;
    case "zip":
      if (!value.trim()) {
        errors.value.zip = "ZIP Code is required";
      } else if (!/^\d{4,10}$/.test(value)) {
        errors.value.zip = "ZIP Code must be 4-10 digits";
      } else {
        errors.value.zip = "";
      }
      break;
    case "country":
      errors.value.country = value.trim() ? "" : "Country is required";
      break;
  }
};

const validateForm = () => {
  Object.keys(shippingInfo.value).forEach((key) => {
    validateField(key, shippingInfo.value[key as keyof typeof shippingInfo.value]);
  });

  return Object.values(errors.value).every((error) => !error);
};

const orderStore = useOrderStore();

const handleCheckout = async () => {
  if (!validateForm()) {
    toastr.error("Please complete shipping details before proceeding.");
    return;
  }

  try {
    const order: Partial<OrderInfo> = {
      id: Date.now(),
      userId: 1,
      items: cartItems.value,
      total: total.value,
      status: "Pending",
      address: shippingInfo.value.address,
      name: shippingInfo.value.name,
      phone: shippingInfo.value.phone,
      city: shippingInfo.value.city,
      zip: shippingInfo.value.zip,
      country: shippingInfo.value.country,
      createdAt: new Date().toISOString(),
    };
    orderStore.createOrder(order);

    router.push("/payment");
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-12 mt-24">
      <div class="flex items-center gap-4 mb-8">
        <div class="bg-primary/10 p-3 rounded-full">
          <i class="fas fa-credit-card text-xl sm:text-2xl text-primary"></i>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-800">Checkout</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-6">
        <div class="md:col-span-2 lg:col-span-2">
          <h3 class="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg">
            Billing details
          </h3>

          <div class="bg-white p-6 shadow rounded-lg mt-2">
            <form @submit.prevent="handleCheckout">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Name *"
                  v-model="shippingInfo.name"
                  placeholder="Name"
                  :error="errors.name"
                  @blur="validateField('name', shippingInfo.name)"
                  @input="errors.name = ''"
                />
                <InputField
                  label="Phone Number *"
                  v-model="shippingInfo.phone"
                  type="number"
                  placeholder="Phone Number"
                  :error="errors.phone"
                  @blur="validateField('phone', shippingInfo.phone)"
                  @input="errors.phone = ''"
                />
                <InputField
                  label="Address *"
                  v-model="shippingInfo.address"
                  placeholder="Address"
                  :error="errors.address"
                  @blur="validateField('address', shippingInfo.address)"
                  @input="errors.address = ''"
                />
                <InputField
                  label="City *"
                  v-model="shippingInfo.city"
                  placeholder="City"
                  :error="errors.city"
                  @blur="validateField('city', shippingInfo.city)"
                  @input="errors.city = ''"
                />
                <InputField
                  label="ZIP Code *"
                  type="number"
                  v-model="shippingInfo.zip"
                  placeholder="ZIP Code"
                  :error="errors.zip"
                  @blur="validateField('zip', shippingInfo.zip)"
                  @input="errors.zip = ''"
                />
                <InputField
                  label="Country *"
                  v-model="shippingInfo.country"
                  placeholder="Country"
                  :error="errors.country"
                  @blur="validateField('country', shippingInfo.country)"
                  @input="errors.country = ''"
                />
              </div>

              <Button
                type="submit"
                class="w-full"
                title="Proceed to Payment"
                icon="fa-solid fa-arrow-right"
              >
              </Button>
            </form>
          </div>
        </div>

        <OrderSummary />
      </div>
    </div>
  </div>
</template>
