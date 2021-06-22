import React from 'react'
import clsx from 'clsx'

interface Props {
  name: string
  label: string
  testId: string
  field: any
  form: any
}

const TextInput = (props: Props) => {
  const {field, label, testId, form} = props
  const {name} = field

  const {errors} = form
  const error = errors[name]

  return (
    <div className="text-input">
      {label && <label htmlFor={name}>{label}</label>}

      {error && (
        <span className="au-error-text" data-testid={testId + '-error'}>
          {error}
        </span>
      )}

      <input
        className={clsx('au-text-input au-text-input--width-lg', {
          'au-text-input--invalid': error,
        })}
        {...field}
      ></input>
    </div>
  )
}

export default TextInput
