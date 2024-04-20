    $(document).ready(function() {
        $("#fruitForm").submit(function(event) {
            let nama = $("input[name='nama']").val();
            let harga = $("input[name='harga']").val();
            let gambar = $("input[name='gambar']").val();
            let deskripsi = $("textarea[name='deskripsi']").val();
            
            if (!nama) {
                Swal.fire({
                    title: 'Kesalahan',
                    text: 'Nama buah tidak boleh kosong',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                event.preventDefault();
                return;
            }
            
            if (!harga) {
                Swal.fire({
                    title: 'Kesalahan',
                    text: 'Harga tidak boleh kosong',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                event.preventDefault();
                return;
            }
        
            
            if (!deskripsi) {
                Swal.fire({
                    title: 'Kesalahan',
                    text: 'Deskripsi tidak boleh kosong',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                event.preventDefault();
                return;
            }
        });
    });
