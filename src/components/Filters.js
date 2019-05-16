import React from 'react';

const Filters = ({ evenAge, oneEvenAgeChange, genders, onGenderChange }) => (
  <form>
    <label htmlFor="evenAge"> With even age</label>
    <input
      type="checkbox"
      checked={evenAge}
      onChange={oneEvenAgeChange}
      name="evenAge"
      id="evenAge"
    />

    <fieldset>
      <legend>Género</legend>
      <label htmlFor="female"> Female</label>
      <input
        type="checkbox"
        checked={genders.includes('female')}
        onChange={onGenderChange}
        name="female"
        id="female"
      />
      <label htmlFor="male"> Male</label>
      <input
        type="checkbox"
        checked={genders.includes('male')}
        onChange={onGenderChange}
        name="male"
        id="male"
      />
    </fieldset>
  </form>
);

export default Filters;
