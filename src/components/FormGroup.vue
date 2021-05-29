<template>
<div>
    <slot :attrs="{errorMessages: activeErrorMessages,success: isValid}" :hasErrors="hasErrors" />
</div>
</template>
<script>
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'
export default {
    extends: singleErrorExtractorMixin
}
</script>