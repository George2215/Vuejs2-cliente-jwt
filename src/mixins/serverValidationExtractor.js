export default {
  data () {
    return {
      validationErrors: []
    }
  },
  methods: {
    generateValidationErrors (errorResponse) {
      this.validationErrors = [];
      if (errorResponse.body.hasOwnProperty('errors')) {
        for (var error in errorResponse.body.errors) {
          const _error = errorResponse.body.errors[error];
          _error.forEach(e => {
            this.validationErrors.push(this.$t(e))
          })
        }
      }
    }
  }
}
