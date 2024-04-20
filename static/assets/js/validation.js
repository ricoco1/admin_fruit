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
            
            if (!gambar) {
                Swal.fire({
                    title: 'Kesalahan',
                    text: 'Silahkan pilih gambar',
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

    function confirmDelete(itemId) {
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Apakah Anda yakin ingin menghapus data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Berhasil',
                    text: 'Data berhasil dihapus',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = '/delete/' + itemId;
                });
            }
        });
    }
