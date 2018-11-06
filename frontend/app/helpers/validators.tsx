import React from 'react';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { validationMessages } from '@/messages/validation-messages';

export const validatUsername = (input, errors) => {
  if (!input.username) {
    errors.username = <FormattedMessage {...validationMessages.required} />
  } else if (input.username.length < 6) {
    errors.username = <FormattedMessage {...validationMessages.mustBe6CharactersOrMore} />
  } else if (!/^[a-z0-9_]+$/.test(input.username)) {
    errors.username = <FormattedMessage {...validationMessages.mustBeAlphaNumeric} />
  }
}

export const validatePassword = (input, errors) => {
  if (!input.password) {
    errors.password = <FormattedMessage {...validationMessages.required} />
  } else if (input.password.length < 8) {
    errors.password = <FormattedMessage {...validationMessages.mustBe8CharactersOrMore} />
  }
}

export const validateConfirmPassword = (input, errors) => {
  if (!input.confirmPassword) {
    errors.confirmPassword = <FormattedMessage {...validationMessages.required} />
  } else if (input.confirmPassword.length < 8) {
    errors.confirmPassword = <FormattedMessage {...validationMessages.mustBe8CharactersOrMore} />
  } else if (input.password.length >= 8 && input.confirmPassword !== input.password) {
    errors.confirmPassword = <FormattedMessage {...validationMessages.passwordsDontMatch} />
  }
}

export const validateTwoFactorAuthenticationCode = (input, errors) => {
  if (input.twoFactorAuthenticationCode && input.twoFactorAuthenticationCode.length !== 6) {
    errors.twoFactorAuthenticationCode = <FormattedMessage {...validationMessages.mustBe6CharactersOrEmpty} />
  }
}