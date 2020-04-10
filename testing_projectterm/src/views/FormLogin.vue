<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="8">
          <b-card class="text-center" title="Sign in">
            <div class="text">
              <b-form>
                <b-form-group
                  id="input-group-1"
                  label="username:"
                  label-for="username"
                  label-align="left"
                >
                  <b-form-input
                    id="username"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="Enter username"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="password:"
                  label-for="password"
                  label-align="left"
                  :invalid-feedback="invalidFeedbackPass"
                  :state="statePass"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Enter password"
                  ></b-form-input>
                </b-form-group>

                <b-button
                  id="show-btn"
                  variant="success"
                  @click="showModal(form)"
                  >Login</b-button
                >
              </b-form>
            </div>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      login: '',
      state: true
    }
  },
  methods: {
    resetText () {
      // Reset our form values
      this.form.username = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
    },
    showModal (input) {
      // try {
      //   const index = this.users.findIndex(
      //     item => item.username === input.username
      //   )
      //   console.log(index)
      //   if (
      //     this.users[index].username === this.form.username &&
      //     this.users[index].password === this.form.password
      //   ) {
      //     console.log('welcome2')
      //     this.$refs['my-modal'].show()
      //   } else {
      //     alert(JSON.stringify('รหัสผิดพลาด'))
      //     this.resetText()
      //   }
      // } catch (error) {
      //   alert(JSON.stringify('ไม่พบ username นี้'))
      //   console.log(error)
      //   this.resetText()
      // }

      axios
        .post('http://localhost:3000/login', this.form)
        .then(res => {
          console.log(res)
          if (this.form.username.length < 1 || this.form.password.length < 1) {
            this.login = 'Please enter Username and Password.'
            this.state = false
          } else if (res.data === null) {
            this.login = 'Username or Password Incorrect.'
            this.state = false
          } else {
            this.state = true
            localStorage.setItem('user', JSON.stringify(res.data))
            this.$router.push('/krapook')
          }
        })
        .catch(err => {
          alert(JSON.stringify('ไม่พบ username นี้'))
          console.log(err)
        })
    }
  },
  mounted () {
    localStorage.removeItem('user')
  },
  computed: {
    statePass () {
      return this.state
    },
    invalidFeedbackPass () {
      return this.login
    }
  }
}
</script>
