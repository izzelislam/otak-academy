import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormSelect, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function RedeemCodeCreate({ courses }) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        quantity: 10,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.redeem-codes.store'));
    };

    return (
        <AdminLayout title="Generate Redeem Codes">
            <Head title="Generate Redeem Codes" />
            <BackLink href={route('admin.redeem-codes.index')}>Kembali ke Redeem Codes</BackLink>

            <div className="max-w-xl">
                <FormCard title="Generate Codes" description="Buat kode redeem baru untuk akses course.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormSelect label="Course" id="course_id" value={data.course_id} onChange={(e) => setData('course_id', e.target.value)} error={errors.course_id} required>
                            <option value="">Pilih course</option>
                            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </FormSelect>
                        <FormInput label="Jumlah" id="quantity" type="number" value={data.quantity} onChange={(e) => setData('quantity', parseInt(e.target.value) || 1)} error={errors.quantity} hint="Generate 1-100 kode sekaligus." min="1" max="100" required />
                        <div className="p-3 rounded-lg bg-[#10a37f]/5 dark:bg-[#10a37f]/10 border border-[#10a37f]/20">
                            <div className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-[#10a37f] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-slate-400">Format kode: <code className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 text-[#10a37f] font-mono text-xs">PROMO-YYYY-XXXX</code></p>
                                </div>
                            </div>
                        </div>
                        <FormActions cancelHref={route('admin.redeem-codes.index')} submitLabel={`Generate ${data.quantity} Kode`} processing={processing} />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
