<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
     Unable to withdraw money because your money is 0
    </b-alert>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3">
          <b-card>
            <b-img
              center
              :src="require('../assets/126327.png')"
              style="width:150px"
              alt="Center image"
            ></b-img>
            <h3 class="text-center">
              {{ user.firstname + ' ' + user.lastname }}
            </h3>
            <b-card-text class="text-center">
              <h2>เงินสะสม</h2>
              <h1>{{ money.money }}</h1>
              <h2>บาท</h2>
            </b-card-text>
            &nbsp; &nbsp;
            <b-button
              pill
              variant="outline-secondary"
              class="float-right"
              style="width:100%"
              @click="logoutUser"
              >Logout</b-button
            >
          </b-card>
        </b-col>
        <b-col cols="9"
          ><b-card title="ประวัติการเงิน">
            <b-button
              style="width:100px"
              variant="danger"
              class="float-right p-2"
              @click="Withdraw"
              v-b-modal.modal-from-Krapook
            >
              ถอนเงิน
            </b-button>
            <b-button
              style="width:100px"
              v-bind:style="{ marginRight: 20 + 'px' }"
              variant="success"
              class="float-right p-2"
              @click="Deposit"
              v-b-modal.modal-from-Krapook
            >
              ฝากเงิน
            </b-button>
            <b-modal
              id="modal-from-confirm"
              ref="modal-from-confirm"
              title="Withdraw money over the available amount."
              @ok="confirmOk"
            >
              <p class="my-4">
                The amount requested is greater than the available amount. So we
                have to withdraw the money until it reaches 0. Do you want to
                withdraw it?
              </p>
            </b-modal>
            <b-modal
              id="modal-from-Krapook"
              ref="modal-from-Krapook"
              :title="title"
              @show="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Money"
                  label-for="money"
                  :invalid-feedback="invalidFeedbackMoney"
                  :valid-feedback="validFeedbackMoney"
                  :state="stateMoney"
                >
                  <b-form-input
                    id="money"
                    type="number"
                    v-model="form.money"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-card class="mt-3" header="Form Data Result">
                  <pre class="m-0">{{ form }}</pre>
                </b-card>
              </form>
            </b-modal>

            <b-table
              striped
              hover
              :items="PiggyBank"
              :fields="fields"
            ></b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import krapookService from './krapookService'
export default {
  data () {
    return {
      title: 'Withdraw',
      money: { _id: '', userID: '', money: 0 },
      form: {
        userID: '',
        money: 0
      },
      user: {
        _id: '',
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      },
      typeOptions: [
        { text: 'Select One', value: null },
        { value: 'Withdraw', text: 'ฟากเงิน' },
        { value: 'Deposit', text: 'ถอนเงิน' }
      ],
      PiggyBank: [],

      fields: ['date', 'type', 'money', 'total'],
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  methods: {
    Withdraw: function () {
      console.log('Withdraw')
      this.title = 'Withdraw'

      this.form.userID = this.user._id

      this.$bvModal.show('modal-from-Krapook')
    },
    logoutUser () {
      this.$router.push('/')
    },

    resetModal: function () {
      this.form = {
        userID: this.user._id,
        money: 0
      }
    },
    handleOk: function (bvModalEvt) {
      bvModalEvt.preventDefault()

      this.handleSubmit()
    },
    confirmOk: function () {
      console.log('confirmOk')

      this.addWithdraw()
      console.log('confirmOk')
      this.$nextTick(() => {
        this.$bvModal.hide('modal-from-confirm')
      })
    },
    addDeposit: function () {
      axios
        .post('http://localhost:3000/account/deposit', this.form)
        .then(res => {
          console.log(res)
          this.getKrapook()
        })
        .catch(err => {
          console.log(err)
        })
    },
    addWithdraw: function () {
      axios
        .post('http://localhost:3000/account/withdraw', this.form)
        .then(res => {
          console.log(res)
          this.getKrapook()
        })
        .catch(err => {
          console.log(err)
          this.showAlert()
        })
    },

    handleSubmit: function () {
      // check valid
      if (this.stateMoney === false) {
        return
      }
      this.form.money = parseInt(this.form.money)

      if (this.title === 'Withdraw') {
        // Push valid
        // this.updateUser(this.form)
        if (krapookService.moneyWithdraw(this.money.money, this.form.money)) {
          this.addWithdraw()
        } else {
          this.$bvModal.show('modal-from-confirm')
        }
      } else {
        this.addDeposit()
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-from-Krapook')
      })
    },
    Deposit: function (user) {
      this.title = 'Deposit'
      this.form.userID = this.user._id

      this.$bvModal.show('modal-from-Krapook')
    },
    getKrapook: function () {
      console.log(this.user)
      // this.PiggyBank = userService.getUser()
      axios
        .get(
          'http://localhost:3000/piggyBanks/PiggyBanksByUserID/' + this.user._id
        )
        .then(res => {
          var sorst = res.data
          sorst.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
          })
          this.PiggyBank = sorst
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })

      axios
        .get('http://localhost:3000/moneys/getMoneyByUserID/' + this.user._id)
        .then(res => {
          this.money = res.data
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  },
  computed: {
    stateMoney () {
      return this.form.money > 0
    },
    invalidFeedbackMoney () {
      if (this.form.money > 0) {
        return ''
      } else if (this.form.money <= 0) {
        return 'Enter a number greater than 0.'
      } else {
        return 'Please enter money'
      }
    },
    validFeedbackMoney () {
      return this.money === true ? 'yes' : ''
    }
  },
  mounted () {
    try {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.getKrapook()
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
