import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from 'yup';

export default function Form() {

  // 👇 Here are the validation errors you will use with yup.
  const validationErrors = {
    fullNameTooShort: 'full name must be at least 3 characters',
    fullNameTooLong: 'full name must be at most 20 characters',
    sizeIncorrect: 'size must be S or M or L'
  }

  // 👇 Here you will create your schema.
  let schema = yup.object().shape({
    fullName: yup.string().trim()
      .min(3, validationErrors.fullNameTooShort)
      .max(20, validationErrors.fullNameTooLong)
      .required(),
    size: yup.string().trim()
      .oneOf(["S", "M", "L"], validationErrors.sizeIncorrect)
      .required()
  })

  // 👇 This array could help you construct your checkboxes using .map in the JSX.
  const toppings = [
    { topping_id: '1', text: 'Pepperoni' },
    { topping_id: '2', text: 'Green Peppers' },
    { topping_id: '3', text: 'Pineapple' },
    { topping_id: '4', text: 'Mushrooms' },
    { topping_id: '5', text: 'Ham' },
  ]

  const getinitialValues = () => ({ fullName: '', size: '', toppings: [] })

  // STATE DECLARATIONS
  let [values, setValues] = useState({ fullName: '', size: '', toppings: [] });
  let [submitEnabled, setSubmitEnabled] = useState(true);
  let [successMessage, setSuccessMessage] = useState('');
  let [failureMessage, setFailureMessage] = useState('');
  let [errorMessages, setErrorMessages] = useState({ fullName: '', size: '', toppings: [] });


  // ONCHANGE FORM CHANGER HELPER
  const onChange = (event) => {

    // Grab relevant data from props in event
    let { value, name, type } = event.target

    // Checkbox alternate path, update checkboxes and toppings array
    if (type === "checkbox") {
      // If we already have the checked object in our toppings array
      if (values.toppings.includes(value)) {
        const checkedArray = values.toppings
        // filter out values that already exist in the array
        const returnArray = checkedArray.filter((toppings) => {
          if (toppings !== value) {
            return toppings
          }
        })

        setValues({ ...values, toppings: returnArray })

        return;
      }
      // If we don't already have the checked object in our toppings array
      if (!values.toppings.includes(value)) {
        setValues({ ...values, toppings: [...values.toppings, value] })
        return;
      }

    }

    // Update state to reflect the new value of "values"
    setValues({ ...values, [name]: value })

    yup.reach(schema, name).validate(value)
      .then(() => {
        setErrorMessages({ ...errorMessages, [name]: '' })
      })
      .catch((err) => {
        console.log(err.errors[0]);
        setErrorMessages({ ...errorMessages, [name]: err.errors[0] })
      });
    console.log(errorMessages)
  }

  // EFFECT ON ANY FORM VALUE CHANGE
  useEffect(() => {

    schema.isValid(values)
      .then((isValid) => setSubmitEnabled(!isValid));

    console.log(values);

  }, [values])


  // SUBMIT BUTTON
  const onSubmit = (event) => {
    console.log("Submit button working")

    event.preventDefault()

    axios.post('http://localhost:9009/api/order', values)
      .then((res) => {
        console.log(res.data.message)
        setSuccessMessage(res.data.message);
        setFailureMessage('');
        setValues(getinitialValues())
      })
      .catch((error) => {
        console.log(error.response.data.message)
        setSuccessMessage('');
        setFailureMessage(error.response.data.message)
      })

  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Order Your Pizza</h2>
      {successMessage && <div className='success'>{successMessage}</div>}
      {failureMessage && <div className='failure'>{failureMessage}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" name="fullName" type="text" value={values.fullName} onChange={onChange} />
        </div>
        {errorMessages.fullName && <div className='error'>{errorMessages.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" onChange={onChange} name="size" value={values.size}>
            <option value="" >----Choose Size----</option>
            {/* Fill out the missing options */}
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {errorMessages.size && <div className='error'>{errorMessages.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {toppings.map((topping) => {
          return (
            <label key={topping.topping_id} value={values.toppings}>
              <input
                value={topping.topping_id}
                type="checkbox"
                onChange={onChange}
                name={"topping.text"}
                checked={values.toppings.includes(topping.topping_id)}
              />
              {topping.text}<br />
            </label>
          )
        })}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled={submitEnabled} />
    </form>
  )
}
