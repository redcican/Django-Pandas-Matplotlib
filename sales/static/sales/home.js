const reportBtn = document.getElementById('report-btn');
const image = document.getElementById('img');
const modalBody = document.getElementById('modal-body');
const reportForm = document.getElementById('report-form');

// handle alert for report creation
const alertBox = document.getElementById('alert-box')

const reportName = document.getElementById('id_name')
const reportRemarks = document.getElementById('id_remarks')
const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value

const handleAlerts = (type, msg) => {
    alertBox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>
    `
}

// console.log(csrf)
if(image){
    reportBtn.classList.remove('not-visible')
}

// add image to the Modal body
reportBtn.addEventListener('click', () => {
    image.setAttribute('class', 'w-100'); // 100% of width
    modalBody.prepend(image)

    // console.log(image.src)

    reportForm.addEventListener('submit', e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('csrfmiddlewaretoken', csrf)
        formData.append('name', reportName.value)
        formData.append('remarks', reportRemarks.value)
        formData.append('image', image.src)

        $.ajax({
            type: 'POST',
            url: '/reports/save/',
            data: formData,
            success: function(response){
                // console.log(response)
                handleAlerts('success', 'report created!')
                reportForm.reset()
            },
            error: function(error){
                // console.log(error)
                handleAlerts('danger', 'oops... something went wrong!')

            },
            processData: false,
            contentType: false,
        })
    })
})