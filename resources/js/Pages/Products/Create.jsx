import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Create({ auth, categories }) {

    const { data, setData, post, processing, errors, progress, get } = useForm({
        name: '',
        image: '',
        price: '',
    })

    const submit = (e) => {
        e.preventDefault()
        preserveScroll: true

        post(route('products.store', {
            previousState: true,
            onSuccess: () => {
                console.log(data)
            }
        }, data))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-bold">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">New Product</h2>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                />

                                {errors.name && <div className="mt-2 text-red-500">{errors.name}</div>}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="price" value="Price" />

                                <TextInput
                                    id="price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="price"
                                />

                                {errors.price && <div className="mt-2 text-red-500">{errors.price}</div>}
                            </div>

                            <div className="mb-0">
                                <InputLabel htmlFor="image" value="Image" />
                                <input
                                    type="file"
                                    className="w-full px-4 py-2"
                                    label="Image"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                />

                                <span className="text-red-600">
                                    {errors.image}
                                </span>
                            </div>

                            {progress && (
                                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" width={progress.percentage}> {progress.percentage}%</div>
                                </div>
                            )}

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Create Product
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
