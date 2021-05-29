import Vue from 'vue'
import Vuelidate from 'vuelidate'
import vuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'
import FormGroup from '../components/FormGroup'
import FormSummary from '../components/FormSummary'
import FormSlot from '../components/FormSlot'

Vue.use(Vuelidate);
Vue.use(vuelidateErrorExtractor, {
    i18n: 'validation',
    i18nAttributes: {
        email: 'forms.email',
        name: 'forms.name',
        password: 'forms.password',
        password_confirmation: 'forms.password_confirmation'
    }
});

Vue.component('FormSlot', FormSlot);
Vue.component('FormGroup', FormGroup);
Vue.component('FormSummary', FormSummary);
Vue.component('FormWrapper', templates.FormWrapper);