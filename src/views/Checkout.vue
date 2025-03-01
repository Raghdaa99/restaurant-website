<script setup lang="ts">
import { computed, ref } from "vue";
import { useCart } from "@/composables/useCart";
import { useOrderStore } from "@/stores/useOrderStore";
import { useRouter } from "vue-router";
import type { OrderInfo } from "@/types/food";
import InputField from "@/components/UI/InputField.vue";
import OrderSummary from "@/components/checkout/OrderSummary.vue";
import Button from "@/components/UI/Button.vue";
import { useI18n } from "vue-i18n";

const { cartItems, total } = useCart();
const router = useRouter();
const { t } = useI18n();

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
      errors.value.name = value.trim() ? "" : t('checkout.nameRequired');
      break;
    case "phone":
      if (!value.trim()) {
        errors.value.phone = t('checkout.phoneRequired');
      } else if (!/^\d{8,15}$/.test(value)) {
        errors.value.phone = t('checkout.phoneInvalid');
      } else {
        errors.value.phone = "";
      }
      break;
    case "address":
      errors.value.address = value.trim() ? "" : t('checkout.addressRequired');
      break;
    case "city":
      errors.value.city = value.trim() ? "" : t('checkout.cityRequired');
      break;
    case "zip":
      if (!value.trim()) {
        errors.value.zip = t('checkout.zipRequired');
      } else if (!/^\d{4,10}$/.test(value)) {
        errors.value.zip = t('checkout.zipInvalid');
      } else {
        errors.value.zip = "";
      }
      break;
    case "country":
      errors.value.country = value.trim() ? "" : t('checkout.countryRequired');
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
    toastr.error(t('checkout.shippingDetailsRequired'));
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
  <div class="min-h-screen bg-slate-100  dark:bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-12 mt-24">
      <div class="flex items-center gap-4 mb-8">
        <div class="bg-primary/10 p-3 rounded-full">
          <i class="fas fa-credit-card text-xl sm:text-2xl text-primary"></i>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">{{ $t('checkout.checkout') }}</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-6">
        <div class="md:col-span-2 lg:col-span-2">
          <h3 class="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg">
            {{ $t('checkout.billingDetails') }}
          </h3>

          <div class="bg-white p-6 shadow rounded-lg mt-2">
            <form @submit.prevent="handleCheckout">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  :label="$t('checkout.firstName')"
                  v-model="shippingInfo.name"
                  :placeholder="$t('checkout.enterFirstName')"
                  :error="errors.name"
                  @blur="validateField('name', shippingInfo.name)"
                  @input="errors.name = ''"
                />
                <InputField
                  :label="$t('checkout.phoneNumber')"
                  v-model="shippingInfo.phone"
                  type="number"
                  :placeholder="$t('checkout.enterPhoneNumber')"
                  :error="errors.phone"
                  @blur="validateField('phone', shippingInfo.phone)"
                  @input="errors.phone = ''"
                />
                <InputField
                  :label="$t('checkout.address')"
                  v-model="shippingInfo.address"
                  :placeholder="$t('checkout.enterAddress')"
                  :error="errors.address"
                  @blur="validateField('address', shippingInfo.address)"
                  @input="errors.address = ''"
                />
                <InputField
                  :label="$t('checkout.city')"
                  v-model="shippingInfo.city"
                  :placeholder="$t('checkout.enterCity')"
                  :error="errors.city"
                  @blur="validateField('city', shippingInfo.city)"
                  @input="errors.city = ''"
                />
                <InputField
                  :label="$t('checkout.zipCode')"
                  type="number"
                  v-model="shippingInfo.zip"
                  :placeholder="$t('checkout.enterZipCode')"
                  :error="errors.zip"
                  @blur="validateField('zip', shippingInfo.zip)"
                  @input="errors.zip = ''"
                />
                <InputField
                  :label="$t('checkout.country')"
                  v-model="shippingInfo.country"
                  :placeholder="$t('checkout.enterCountry')"
                  :error="errors.country"
                  @blur="validateField('country', shippingInfo.country)"
                  @input="errors.country = ''"
                />
              </div>

              <Button
                type="submit"
                class="w-full"
                :title="$t('checkout.proceedToCheckout')"
                icon="fa-solid fa-arrow-right"
              >
                {{ $t('checkout.proceedToCheckout') }}
              </Button>
            </form>
          </div>
        </div>

        <OrderSummary />
      </div>
    </div>
  </div>
</template>
