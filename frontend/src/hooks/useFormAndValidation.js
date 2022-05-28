import {useState, useCallback} from 'react';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);

  const regexEmail = /^\w+\@\w+\.\w{1,6}$/gim
  const regexName = /^[а-я, a-z,  -]+/gim

  const validationEmail = (name, value) => {
    if (!regexEmail.test(value)) {
      setErrors({...errors, [name]: 'Указан некорректный адрес почты.'});
      setIsValid(false)
    }
  }

  const validationName = (name, value) => {
    if (value.match(regexName).join('') !== value) {
      setErrors({...errors, [name]: 'Имя указано некорректно.'});
      setIsValid(false)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
    if (e.target.type === 'email' && e.target.validity.valid) validationEmail(name, value)
    if (e.target.id === 'name' && e.target.validity.valid) validationName(name, value)
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}
