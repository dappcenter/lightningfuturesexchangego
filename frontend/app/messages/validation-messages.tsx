import { defineMessages } from "react-intl";

export const validationMessages = defineMessages({
  incorrectPassword: {
    id: 'validation.incorrectPassword',
    defaultMessage: 'Incorrect password.'
  },
  invalidEmail: {
    id: 'validation.invalidEmailAddress',
    defaultMessage: 'Invalid email address.'
  },
  mustBeAlphaNumeric: {
    id: 'validation.mustBeAlphaNumeric',
    defaultMessage: 'Must be alphanumeric.'
  },
  mustBe6CharactersOrEmpty: {
    id: 'validation.mustBe6CharactersOrEmpty',
    defaultMessage: 'Must be 6 characters or empty.'
  },
  mustBe6CharactersOrMore: {
    id: 'validation.mustBe6CharactersOrMore',
    defaultMessage: 'Must be 6 characters or more.'
  },
  mustBe8CharactersOrMore: {
    id: 'validation.mustBe8CharactersOrMore',
    defaultMessage: 'Must be 8 characters or more.'
  },
  passwordsDontMatch: {
    id: 'validation.passwordsDontMatch',
    defaultMessage: 'Passwords don\'t match.'
  },
  unknownError: {
    id: 'validation.unknownError',
    defaultMessage: 'Unknown error!'
  },
  usernameAlreadyExists: {
    id: 'validation.usernameAlreadyExists',
    defaultMessage: 'Username already exists.'
  },
  usernameNotFound: {
    id: 'validation.usernameNotFound',
    defaultMessage: 'Username not found.'
  },
  required: {
    id: 'validation.required',
    defaultMessage: 'Required.'
  }
});