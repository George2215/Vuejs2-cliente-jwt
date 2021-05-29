export default {
  mounted () {
    clearInterval(this.interval);
    this.$jwtEvents.$on('tokenExpiring', (time) => {
      if (!this.dialog) {
        this.time = Math.floor(time);
        this.dialog = true;
        this.interval = setInterval(() => {
          this.time -= 1;
          if (this.time === 0) {
            this.dialog = false;
            clearInterval(this.interval);
            this.$jwtEvents.$emit('tokenExpired');
            return this.$router.replace({ name: 'Login' })
          }
        }, 1000)
      }
    })
  }
}
