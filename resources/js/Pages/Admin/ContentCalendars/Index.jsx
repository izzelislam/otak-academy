import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ContentCalendarIndex({ contents }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [modalMode, setModalMode] = useState('single'); // 'single' or 'bulk'
    
    // Form handling for single entry
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        id: null,
        folder_name: '',
        content_date: new Date().toISOString().split('T')[0],
        status: 'pending',
        platforms: [],
    });

    // Form handling for bulk generation
    const bulkForm = useForm({
        prefix: 'CO',
        start_number: 1,
        quantity: 10,
        start_date: new Date().toISOString().split('T')[0],
        platforms: [],
    });

    const openCreateModal = () => {
        setIsEditing(false);
        setModalMode('single');
        reset();
        clearErrors();
        setShowModal(true);
    };

    const openBulkModal = () => {
        setModalMode('bulk');
        bulkForm.reset();
        bulkForm.clearErrors();
        setShowModal(true);
    };

    const openEditModal = (content) => {
        setIsEditing(true);
        setModalMode('single');
        setData({
            id: content.id,
            folder_name: content.folder_name,
            content_date: content.content_date,
            status: content.status,
            platforms: content.platforms || [],
        });
        clearErrors();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
        bulkForm.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(route('admin.content-calendars.update', data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.content-calendars.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleBulkSubmit = (e) => {
        e.preventDefault();
        bulkForm.post(route('admin.content-calendars.bulk-generate'), {
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this schedule?')) {
            router.delete(route('admin.content-calendars.destroy', id));
        }
    };
    
    const handlePlatformChange = (platform, checked) => {
        let newPlatforms = [...data.platforms];
        if (checked) {
            newPlatforms.push(platform);
        } else {
            newPlatforms = newPlatforms.filter(p => p !== platform);
        }
        setData('platforms', newPlatforms);
    };

    const handleBulkPlatformChange = (platform, checked) => {
        let newPlatforms = [...bulkForm.data.platforms];
        if (checked) {
            newPlatforms.push(platform);
        } else {
            newPlatforms = newPlatforms.filter(p => p !== platform);
        }
        bulkForm.setData('platforms', newPlatforms);
    };

    // Generate preview of folder names
    const generatePreview = () => {
        const { prefix, start_number, quantity } = bulkForm.data;
        const previews = [];
        const maxPreview = Math.min(quantity, 5);
        
        for (let i = 0; i < maxPreview; i++) {
            previews.push(prefix + (parseInt(start_number) + i));
        }
        
        if (quantity > 5) {
            previews.push('...');
            previews.push(prefix + (parseInt(start_number) + parseInt(quantity) - 1));
        }
        
        return previews;
    };

    const columns = [
        { label: 'Folder Name' },
        { label: 'Date' },
        { label: 'Platform' },
        { label: 'Status' },
        { label: 'Uploaded At' },
        { label: 'Actions', align: 'right' },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {item.folder_name}
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400">
                {new Date(item.content_date).toLocaleDateString()}
            </td>
            <td className="px-4 py-3">
                <div className="flex gap-1">
                    {item.platforms?.includes('instagram') && (
                        <span className="text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400 px-2 py-0.5 rounded text-xs font-medium">IG</span>
                    )}
                    {item.platforms?.includes('facebook') && (
                        <span className="text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-medium">FB</span>
                    )}
                </div>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                    item.status === 'published' 
                        ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {item.uploaded_at ? new Date(item.uploaded_at).toLocaleString() : '-'}
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    <IconButton onClick={() => openEditModal(item)} title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </IconButton>
                    <IconButton variant="danger" onClick={() => handleDelete(item.id)} title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </IconButton>
                </div>
            </td>
        </tr>
    );

    return (
        <AdminLayout title="Content Calendar">
            <Head title="Content Calendar" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Manage social media content automation</p>
                <div className="flex gap-2">
                    <Button onClick={openBulkModal} size="sm" variant="outline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}>
                        Generate Bulk
                    </Button>
                    <Button onClick={openCreateModal} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                        Schedule Content
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={contents}
                renderRow={renderRow}
            />

            <Modal show={showModal} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    {modalMode === 'single' ? (
                        <>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                {isEditing ? 'Edit Content Schedule' : 'Schedule New Content'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="folder_name" value="Folder Name (Drive)" />
                                    <TextInput
                                        id="folder_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.folder_name}
                                        onChange={(e) => setData('folder_name', e.target.value)}
                                        required
                                        isFocused
                                    />
                                    <InputError message={errors.folder_name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="content_date" value="Content Date" />
                                    <TextInput
                                        id="content_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.content_date}
                                        onChange={(e) => setData('content_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.content_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel value="Platform" />
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center">
                                            <Checkbox
                                                checked={data.platforms.includes('instagram')}
                                                onChange={(e) => handlePlatformChange('instagram', e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-slate-400">Instagram</span>
                                        </label>
                                        <label className="flex items-center">
                                            <Checkbox
                                                checked={data.platforms.includes('facebook')}
                                                onChange={(e) => handlePlatformChange('facebook', e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-slate-400">Facebook</span>
                                        </label>
                                    </div>
                                    <InputError message={errors.platforms} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select
                                        id="status"
                                        className="mt-1 block w-full border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-[#10a37f] focus:ring-[#10a37f] rounded-md shadow-sm"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="published">Published</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <Button type="button" variant="outline" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {isEditing ? 'Save Changes' : 'Schedule'}
                                    </Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Generate Bulk Content
                            </h2>

                            <form onSubmit={handleBulkSubmit} className="space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <InputLabel htmlFor="prefix" value="Prefix" />
                                        <TextInput
                                            id="prefix"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={bulkForm.data.prefix}
                                            onChange={(e) => bulkForm.setData('prefix', e.target.value)}
                                            placeholder="CO"
                                            required
                                            isFocused
                                        />
                                        <InputError message={bulkForm.errors.prefix} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="start_number" value="Start Number" />
                                        <TextInput
                                            id="start_number"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={bulkForm.data.start_number}
                                            onChange={(e) => bulkForm.setData('start_number', e.target.value)}
                                            min="1"
                                            required
                                        />
                                        <InputError message={bulkForm.errors.start_number} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="quantity" value="Quantity" />
                                        <TextInput
                                            id="quantity"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={bulkForm.data.quantity}
                                            onChange={(e) => bulkForm.setData('quantity', e.target.value)}
                                            min="1"
                                            max="100"
                                            required
                                        />
                                        <InputError message={bulkForm.errors.quantity} className="mt-2" />
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-2">Preview:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {generatePreview().map((name, idx) => (
                                            <span 
                                                key={idx} 
                                                className="px-2 py-1 text-xs font-mono bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded border border-gray-200 dark:border-slate-600"
                                            >
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="start_date" value="Start Date" />
                                    <TextInput
                                        id="start_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={bulkForm.data.start_date}
                                        onChange={(e) => bulkForm.setData('start_date', e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                        Each content will be scheduled 1 day apart starting from this date
                                    </p>
                                    <InputError message={bulkForm.errors.start_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel value="Platform" />
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center">
                                            <Checkbox
                                                checked={bulkForm.data.platforms.includes('instagram')}
                                                onChange={(e) => handleBulkPlatformChange('instagram', e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-slate-400">Instagram</span>
                                        </label>
                                        <label className="flex items-center">
                                            <Checkbox
                                                checked={bulkForm.data.platforms.includes('facebook')}
                                                onChange={(e) => handleBulkPlatformChange('facebook', e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-slate-400">Facebook</span>
                                        </label>
                                    </div>
                                    <InputError message={bulkForm.errors.platforms} className="mt-2" />
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <Button type="button" variant="outline" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={bulkForm.processing}>
                                        Generate {bulkForm.data.quantity} Entries
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </Modal>
        </AdminLayout>
    );
}
