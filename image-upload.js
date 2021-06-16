// Logic for the 'upload picture' feature

const imgInput = document.querySelector('#img-file');
const imgUser = document.querySelectorAll('#img-user')


imgInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            
            imgUser.forEach(img => {
                img.setAttribute('src', this.result);
            })
        })

        reader.readAsDataURL(file);
    } else {
        imgUser.setAttribute('src', 'images/default.png');
    }
})