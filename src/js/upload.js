(function() {

    const upload_fields = document.querySelectorAll('.upload__input');

    upload_fields.forEach(el => {
        el.addEventListener('change', e => {
            // remove C:\fakepath\ before file name
            e.target.previousElementSibling.textContent = e.target.value.slice(12);
        })
    });

}());
