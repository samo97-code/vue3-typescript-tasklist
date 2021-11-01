const isRequired = (value,type)=>{
  return !value ? `${type} field is required` : null
}

const isMinLength = (value,type,minLength)=>{
  return value.length < minLength ? `${type} field must have min ${minLength} characters` : null
}

const useValidate =  (form,rules,type) => {
  let errors = []
  let data = null

  Object.entries(rules[type]).map((rule)=>{
    if (rule[0] === 'required'){
       data = isRequired(form[type],type)
      if (data) errors.push(data)
    }
    if (rule[0] === 'minLength'){
       data = isMinLength(form[type],type,rule[1])
      if (data) errors.push(data)
    }

  })

  return {list: errors}
};

export default useValidate;
