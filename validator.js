function Validator(options){
    function validate(inputElement,rule){
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    var formElement = document.querySelector(options.form);
    if(formElement){
        options.rules.forEach(function (rule){
            var inputElement = formElement.querySelector(rule.selector)
            

            if(inputElement){
                //xử lý blur
                inputElement.onblur = function(){
                    validate(inputElement, rule)
                }
                //xử lý khi đang nhập lại
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })  
    }
}


// nguyên tắc các rule khi có lỗi thì trả ra messae lỗi 
//hợp lệ không trả về
Validator.isRequired = function(selector){
    return{
        selector : selector,
        test: function(value){
            return value.trim() ? undefined : 'vui lòng nhập trường này';

        }
    }

}



Validator.isEmail = function(selector){
    return{
        selector : selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'vui lòng nhập email'

        }
    }

}

Validator.minLength = function(selector, min){
    return{
        selector : selector,
        test: function(value){
            return value.length >= min ? undefined : `password phải hơn ${min} ký tự`

        }
    }

}