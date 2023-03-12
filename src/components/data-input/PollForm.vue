<template>
  <div class="poll-form">
    <h2>Créer un sondage</h2>
    <form @submit.prevent="createPoll">
      <div class="form-group">
        <label for="question">Question :</label>
        <input
          id="question"
          v-model="question"
          type="text"
          required
        />
      </div>
      <div class="form-group">
        <label for="choice1">Choix 1 :</label>
        <input
          id="choice1"
          v-model="choices[0]"
          type="text"
          required
        />
      </div>
      <div class="form-group">
        <label for="choice2">Choix 2 :</label>
        <input
          id="choice2"
          v-model="choices[1]"
          type="text"
          required
        />
      </div>
      <div
        v-for="(choice, index) in additionalChoices"
        :key="index"
        class="form-group"
      >
        <label :for="'choice' + (index + 3)">Choix {{ index + 3 }} :</label>
        <input
          :id="'choice' + (index + 3)"
          v-model="additionalChoices[index]"
          :type="'text'"
        />
        <button
          type="button"
          :disabled="index < 1"
          @click="removeChoice(index + 2)"
        >
          Supprimer
        </button>
      </div>
      <div class="form-group">
        <button
          type="button"
          @click="addChoice"
        >
          Ajouter un choix
        </button>
      </div>
      <div class="form-group">
        <label for="duration">Durée (jours) :</label>
        <input
          id="duration"
          v-model.number="duration"
          type="number"
          min="1"
          max="7"
          required
        />
      </div>
      <button type="submit">Créer le sondage</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: '',
      choices: ['', ''],
      additionalChoices: [],
      duration: 1,
    }
  },
  methods: {
    addChoice() {
      this.additionalChoices.push('')
    },
    removeChoice(index) {
      this.additionalChoices.splice(index - 2, 1)
    },
    createPoll() {
      const poll = {
        question: this.question,
        choices: this.choices.concat(this.additionalChoices.filter((choice) => choice.trim() !== '')),
        duration: this.duration,
      }
      console.log(poll) // Replace with your API call or form submission logic
    },
  },
}
</script>

<style scoped>
.poll-form {
  margin: 50px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type='text'],
.form-group input[type='number'] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-group button[type='submit'],
.form-group button[type='button'] {
  background-color: #007aff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.form-group button[type='submit']:hover,
.form-group button[type='button']:hover {
  background-color: #0056b3;
}

.additional-choice button {
  margin-left: 10px;
  background-color: #ff3b30;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.form-group button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.additional-choice input[type='text'] {
  flex: 1;
  margin-left: 10px;
}

.additional-choice button:hover {
  background-color: #d60000;
}

.additional-choice button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
