const form = document.getElementById("formPendaftaran");

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function resetError(input, errorSpan) {
    errorSpan.textContent = "";
    input.classList.remove("error-input");
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const inputs = [
        { el: document.getElementById("nama"), error: document.getElementById("error-nama"), validate: (v) => v !== "", msg: "Nama lengkap harus diisi" },
        { el: document.getElementById("email"), error: document.getElementById("error-email"), validate: (v) => v !== "" && validateEmail(v), msg: "Email harus diisi dengan format yang benar" },
        { el: document.getElementById("nim"), error: document.getElementById("error-nim"), validate: (v) => /^\d{8,11}$/.test(v), msg: "Input harus berupa angka (8–11 digit)" },
        { el: document.getElementById("nohp"), error: document.getElementById("error-telp"), validate: (v) => /^\d{10,15}$/.test(v), msg: "Nomor HP tidak valid" },
        { el: document.getElementById("universitas"), error: document.getElementById("error-univ"), validate: (v) => v !== "", msg: "Universitas harus dipilih" },
        { el: document.getElementById("prodi"), error: document.getElementById("error-prodi"), validate: (v) => v !== "", msg: "Program studi harus dipilih" },
        { el: document.getElementById("Setuju"), error: document.getElementById("error-check"), validate: (v) => v === true, msg: "Harap setujui syarat dan ketentuan" }
    ];

    let isValid = true;

    inputs.forEach(item => {
        resetError(item.el, item.error);
        const value = item.el.type === "checkbox" ? item.el.checked : item.el.value.trim();
        if (!item.validate(value)) {
            item.error.textContent = item.msg;
            item.el.classList.add("error-input");
            isValid = false;
        }
    });

    if (isValid) {
        Swal.fire({
            title: 'Berhasil!',
            text: 'Pendaftaran berhasil dikirim!',
            icon: 'success',
        }).then(() => {
            form.reset();
            inputs.forEach(item => item.el.classList.remove("error-input"));
        });
    }
});
