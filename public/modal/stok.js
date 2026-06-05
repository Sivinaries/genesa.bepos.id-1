$(document).ready(function () {
    // ========== DataTable Initialization ==========
    new DataTable('#myTable', {});

    // Open add modal
    $('#opnameBtn, #emptyOpnameBtn').click(() => $('#opnameModal').removeClass('hidden'));
    $('#closeOpnameModal').click(() => $('#opnameModal').addClass('hidden'));

    $(document).on('click', '.receiveBtn', function () {
        const btn = $(this);
        $('#receiveInventId').val(btn.data('id'));
        $('#receiveBahanName').text(btn.data('name'));
        $('#receiveBahanStock').text(btn.data('stock'));
        $('#receiveBahanUnit').text(btn.data('unit'));
        $('#receiveModal').removeClass('hidden');
    });

    $('#closeReceiveModal').click(() => $('#receiveModal').addClass('hidden'));

    $('#opnameInventSelect, #opnameActualStock').on('change input', updateOpnameDelta);

    // Delete confirmation
    $(document).on('click', '.delete-confirm', function (e) {
        e.preventDefault();
        const form = $(this).closest('form');
        Swal.fire({
            title: 'Hapus?',
            text: 'Data akan dihapus permanen.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        }).then(result => result.isConfirmed && form.submit());
    });

    function updateOpnameDelta() {
        const opt = $('#opnameInventSelect').find(':selected');
        const sysStock = parseInt(opt.data('stock'));
        const unit = opt.data('unit') || '';
        const actual = parseInt($('#opnameActualStock').val());

        if (isNaN(sysStock) || isNaN(actual)) {
            $('#opnameDeltaPreview').text('');
            return;
        }

        const delta = actual - sysStock;
        if (delta === 0) {
            $('#opnameDeltaPreview').html('<span class="text-gray-500">Tidak ada perubahan stok.</span>');
        } else if (delta > 0) {
            $('#opnameDeltaPreview').html(`<span class="text-green-600">Penyesuaian naik: +${delta} ${unit}</span>`);
        } else {
            $('#opnameDeltaPreview').html(`<span class="text-red-600">Penyesuaian turun: ${delta} ${unit}</span>`);
        }
    }

});
