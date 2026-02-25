<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $payment->order_id }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 30px;
        }
        .header {
            width: 100%;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header-content {
            display: inline-block;
            width: 50%;
        }
        .header-title {
            float: right;
            text-align: right;
        }
        .header-title h1 {
            color: #10a37f;
            margin: 0;
            font-size: 32px;
        }
        .header-title p {
            margin: 5px 0 0 0;
            color: #666;
        }
        .company-info {
            font-size: 14px;
            color: #666;
            margin-top: 5px;
        }
        .company-name {
            font-size: 20px;
            font-weight: bold;
            color: #333;
        }
        .info-section {
            width: 100%;
            margin-bottom: 40px;
        }
        .bill-to {
            width: 50%;
            float: left;
        }
        .invoice-details {
            width: 40%;
            float: right;
            text-align: right;
        }
        .label {
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
            display: block;
        }
        .value {
            font-size: 14px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th {
            background-color: #f8f9fa;
            color: #666;
            text-align: left;
            padding: 12px;
            border-bottom: 2px solid #eee;
            font-size: 12px;
            text-transform: uppercase;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .total-row {
            font-weight: bold;
        }
        .total-row td {
            background-color: #f8f9fa;
            border-top: 2px solid #eee;
            border-bottom: none;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        .status-paid {
            color: #059669;
            font-weight: bold;
            text-transform: uppercase;
            border: 2px solid #059669;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            font-size: 12px;
        }
        .clear {
            clear: both;
        }
    </style>
</head>
<body>

    <div class="header">
        <div class="header-content">
            <div class="company-name">OtakAtikin</div>
            <div class="company-info">
                Platform konten & pembelajaran terpercaya.<br>
                Belajar dan berkembang barsama kami.
            </div>
        </div>
        <div class="header-content header-title">
            <h1>INVOICE</h1>
            <p># {{ $payment->order_id }}</p>
        </div>
        <div class="clear"></div>
    </div>

    <div class="info-section">
        <div class="bill-to">
            <span class="label">Ditagihkan Kepada:</span>
            <div class="value">{{ $user->name }}</div>
            <div style="font-size:14px; color:#666; margin-top:4px;">{{ $user->email }}</div>
        </div>
        <div class="invoice-details">
            <div style="margin-bottom: 10px;">
                <span class="label">Status:</span>
                <span class="status-paid">LUNAS</span>
            </div>
            <div style="margin-bottom: 10px;">
                <span class="label">Tanggal Invoice:</span>
                <span class="value">{{ $payment->created_at->format('d M Y, H:i') }}</span>
            </div>
            <div>
                <span class="label">Tanggal Bayar:</span>
                <span class="value">{{ $payment->paid_at ? \Carbon\Carbon::parse($payment->paid_at)->format('d M Y, H:i') : '-' }}</span>
            </div>
        </div>
        <div class="clear"></div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Deskripsi Item</th>
                <th class="text-right">Tipe Item</th>
                <th class="text-right">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>{{ $payment->payable->title ?? 'Item Tidak Ditemukan' }}</strong>
                </td>
                <td class="text-right">
                    {{ str_contains(class_basename($payment->payable_type), 'Course') ? 'Course' : 'Asset Digital' }}
                </td>
                <td class="text-right">Rp {{ number_format($payment->amount, 0, ',', '.') }}</td>
            </tr>
            <tr class="total-row">
                <td colspan="2" class="text-right">Total Keseluruhan</td>
                <td class="text-right" style="color:#10a37f; font-size:16px;">Rp {{ number_format($payment->amount, 0, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        Terima kasih atas pembelian Anda!<br>
        Jika Anda memiliki pertanyaan mengenai invoice ini, silakan hubungi dukungan pelanggan kami.
    </div>

</body>
</html>
