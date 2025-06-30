import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, products }) {
    const [confirmingProductDeletion, confirmingProductDelete] = useState(false);
    const productId = useRef(null);

    const { setData, delete: destroy, processing, reset, errors } = useForm();

    const confirmProductDelete = (id) => {
        confirmingProductDelete(true);
        productId.value = id;
    };

    const deleteProduct = (e) => {
        preserveScroll: true
        destroy(route('products.delete', {product: productId.value}), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        confirmingProductDelete(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>
                </div>
            </header>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <Link href={route('products.create')} className="inline-flex items-center my-4 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Create Product
                    </Link>
                    
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">

                                        <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                            <thead className="bg-indigo-500">
                                                <tr>
                                                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-between">
                                                            ID
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-between">
                                                            Image
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-between">
                                                            Name
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-between">
                                                            Price
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-between">
                                                            Actions
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                { products && products.map( (product) => (
                                                    <tr key={product.id}>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            {product.categories.map(c => c.name).join(',')}
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            <img className="h-20 max-w-xs" src={product.image} alt={`${product.name}`} />
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            {product.name}
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            {product.price}
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            <Link href={route('products.edit', {product: product.id})}
                                                                className="mr-1 mb-1 px-4 py-2 uppercase text-sm leading-4 border rounded-md hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <DangerButton className="ms-3" onClick={() => confirmProductDelete(product.id)}>
                                                                Delete
                                                            </DangerButton>
                                                        </td>
                                                    </tr>
                                                )) }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={confirmingProductDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete the product?
                    </h2>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing} onClick={() => deleteProduct(productId)}>
                            Delete Product
                        </DangerButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}
