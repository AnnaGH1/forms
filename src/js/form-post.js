(function() {

    const url = 'http://jsonplaceholder.typicode.com/posts';

    const forms = document.querySelectorAll('.js-form');
    const form_fields = document.querySelectorAll('.js-field');
    const submits = document.querySelectorAll('.js-submit');
    const tels = document.querySelectorAll('.js-tel');

    tels.forEach(el => {
        Inputmask({
            regex: '\\+1\\([0-9]{3}\\)-[0-9]{3}-[0-9]{4}'
        })
            .mask(el);
    });

    const options = {
        uiEnabled: false,
        focus: "none"
    };

    // Update validation message of edited field
    form_fields.forEach(el => {
        el.addEventListener('focus', function (e) {
            e.target.parentElement.classList.remove('form__field-wrapper--error');
            e.target.parentElement.classList.remove('form__field-wrapper--success');
        })
    });

    forms.forEach(el => {
        $(el).parsley(options);

        // Field - error message
        $(el).parsley().on('field:error', function () {
            this.$element.val('');
            this.$element.closest('.form__field-wrapper').addClass('form__field-wrapper--error');
        });

        // Field - success message
        $(el).parsley().on('field:success', function () {
            this.$element.closest('.form__field-wrapper').addClass('form__field-wrapper--success');
        });

        // Form - submission
        $(el).parsley().on('form:success', function () {
            let formEl = this.$element.get(0);
            let data = new FormData(formEl);

            let options = {
                method: 'POST',
                body: data
            };

            let req = new Request(url, options);

            // Reset fields
            function resetFormCustom () {
                formEl.reset();

                if (formEl.querySelector('.upload__path')) {
                    formEl.querySelector('.upload__path').textContent = 'Select your file';
                }

                let fieldWrappers = formEl.querySelectorAll('.form__field-wrapper');
                fieldWrappers.forEach(el => {
                    el.classList.remove('form__field-wrapper--success')
                });
            }

            fetch(req)
                .then(res => {
                    if(res.ok) {
                        resetFormCustom();
                        window.sendMsg.showSuccessMsg();
                        return res.json();
                    } else {
                        resetFormCustom();
                        window.sendMsg.showFailureMsg();
                    }
                })
                .then(json => console.log(json))
                .catch(() => {
                    resetFormCustom();
                    window.sendMsg.showFailureMsg();
                });

        });

    });

    function submitButtonListener(e) {
        e.preventDefault();
        const form = e.target.closest('.js-form');
        $(form).parsley().validate();
    }

    submits.forEach(el => {
        el.addEventListener('click', submitButtonListener)
    })

}());
