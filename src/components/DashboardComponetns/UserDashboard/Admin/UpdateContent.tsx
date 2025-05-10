/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateContent } from '@/service/Content';

interface MovieFormProps {
     existingData?: {
          id: string;
          title: string;
          genre: string;
          category: string;
          director: string;
          releaseYear: number;
          cast: string;
          streamingPlatform: string;
          description: string;
          like?: number;
          price?: number;
          dislike?: number;
          thumbnailImage?: string;
     };
}

const UpdateContentFrom = ({ existingData }: MovieFormProps) => {
     const { register, handleSubmit, reset, formState: { errors } } = useForm({
          defaultValues: existingData ? {
               title: existingData.title,
               genre: existingData.genre,
               category: existingData.category,
               director: existingData.director,
               releaseYear: existingData.releaseYear,
               cast: existingData.cast,
               streamingPlatform: existingData.streamingPlatform,
               description: existingData.description,
               like: existingData.like,
               price: existingData.price,
               dislike: existingData.dislike
          } : {}
     });

     const [previewImage, setPreviewImage] = useState<string | null>(existingData?.thumbnailImage || null);
     const [imageFile, setImageFile] = useState<File | null>(null);


     const router = useRouter()


     const genres = [
          "ACTION", "ADVENTURE", "ANIMATION", "COMEDY", "DRAMA",
          "HORROR", "MYSTERY", "ROMANCE", "SCIENCE_FICTION", "THRILLER",
          "FANTASY", "DOCUMENTARY", "CRIME", "HISTORICAL", "MUSIC",
          "WAR", "WESTERN", "FAMILY", "BIOGRAPHY", "SPORT", "MUSICAL",
          "SUPERHERO", "PSYCHOLOGICAL", "SLICE_OF_LIFE", "TRAGEDY",
          "POLITICAL", "SATIRE"
     ];

     const categories = ["MOVIE", "SERIES"];

     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
          const id = toast.loading("Updating...");

          const formData = new FormData();

          // If user selected a new image
          if (imageFile) {
               formData.append("file", imageFile);
          }

          const formValues = {
               ...(existingData?.id && { id: existingData.id }),
               title: data.title || existingData?.title,
               genre: data.genre || existingData?.genre,
               category: data.category || existingData?.category,
               director: data.director || existingData?.director,
               releaseYear: data.releaseYear || existingData?.releaseYear,
               cast: data.cast || existingData?.cast,
               streamingPlatform: data.streamingPlatform || existingData?.streamingPlatform,
               description: data.description || existingData?.description,
               like: data.like !== undefined ? Number(data.like) : existingData?.like,
               price: data.price !== undefined ? Number(data.price) : existingData?.price,
               dislike: data.dislike !== undefined ? Number(data.dislike) : existingData?.dislike,
          };

          formData.append("data", JSON.stringify(formValues));

          try {
               const result = await updateContent(existingData?.id, formData);
               console.log(result)
               if (result.success) {
                    toast.success(result.message, { id });
                    router.push('/dashboard/admin/movie-series')
                    reset();
               } else {
                    toast.error(result.message, { id });
               }
          } catch (error: any) {
               toast.error(error.message, { id });
          }
     };


     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
               setImageFile(file);
               const reader = new FileReader();
               reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
               };
               reader.readAsDataURL(file);
          }
     };

     return (
          <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-purple-600 p-6 text-white">
                         <h2 className="text-2xl font-bold">
                              {'Edit'} Movie/TV Show
                         </h2>
                         <p className="opacity-90">
                              {'Fill in the details below to add a new title'}
                         </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                         {/* Image Upload */}
                         <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                   Cover Image {'*'}
                              </label>
                              <div className="flex items-center space-x-4">
                                   <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-200">
                                        {previewImage ? (
                                             <Image
                                                  height={500}
                                                  width={500}
                                                  src={existingData?.thumbnailImage || previewImage}
                                                  alt="Preview"
                                                  className="w-full h-full object-cover"
                                             />
                                        ) : (
                                             <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                  </svg>
                                             </div>
                                        )}
                                   </div>
                                   <div className="flex-1">
                                        <input
                                             type="file"
                                             accept="image/*"
                                             onChange={handleImageChange}
                                             className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                             {'PNG, JPG up to 2MB'}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Title */}
                         <div>
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title*</label>
                              <input
                                   id="title"
                                   type="text"
                                   {...register("title", { required: "Title is required" })}
                                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                              />
                              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message?.toString()}</p>}
                         </div>

                         {/* Category and Genre */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                   <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category*</label>
                                   <select
                                        id="category"
                                        {...register("category", { required: "Category is required" })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   >
                                        {categories.map((cat) => (
                                             <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                   </select>
                                   {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message?.toString()}</p>}
                              </div>

                              <div>
                                   <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre*</label>
                                   <select
                                        id="genre"
                                        {...register("genre", { required: "Genre is required" })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   >
                                        {genres.map((genre) => (
                                             <option key={genre} value={genre}>{genre.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}</option>
                                        ))}
                                   </select>
                                   {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre.message?.toString()}</p>}
                              </div>
                         </div>

                         {/* Director and Release Year */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                   <label htmlFor="director" className="block text-sm font-medium text-gray-700">Director*</label>
                                   <input
                                        id="director"
                                        type="text"
                                        {...register("director", { required: "Director is required" })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   />
                                   {errors.director && <p className="mt-1 text-sm text-red-600">{errors.director.message?.toString()}</p>}
                              </div>

                              <div>
                                   <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">Release Year*</label>
                                   <input
                                        id="releaseYear"
                                        type="number"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        {...register("releaseYear", {
                                             required: "Release year is required",
                                             min: {
                                                  value: 1900,
                                                  message: "Year must be after 1900"
                                             },
                                             max: {
                                                  value: new Date().getFullYear(),
                                                  message: `Year can't be in the future`
                                             }
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   />
                                   {errors.releaseYear && <p className="mt-1 text-sm text-red-600">{errors.releaseYear.message?.toString()}</p>}
                              </div>
                         </div>

                         {/* Cast */}
                         <div>
                              <label htmlFor="cast" className="block text-sm font-medium text-gray-700">Cast*</label>
                              <input
                                   id="cast"
                                   type="text"
                                   {...register("cast", { required: "Cast is required" })}
                                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   placeholder="Separate names with commas"
                              />
                              {errors.cast && <p className="mt-1 text-sm text-red-600">{errors.cast.message?.toString()}</p>}
                         </div>

                         {/* Streaming Platform */}
                         <div>
                              <label htmlFor="streamingPlatform" className="block text-sm font-medium text-gray-700">Streaming Platform*</label>
                              <input
                                   id="streamingPlatform"
                                   type="text"
                                   {...register("streamingPlatform", { required: "Streaming platform is required" })}
                                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                              />
                              {errors.streamingPlatform && <p className="mt-1 text-sm text-red-600">{errors.streamingPlatform.message?.toString()}</p>}
                         </div>

                         {/* Description */}
                         <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description*</label>
                              <textarea
                                   id="description"
                                   rows={4}
                                   {...register("description", { required: "Description is required" })}
                                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                              />
                              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message?.toString()}</p>}
                         </div>

                         {/* Rating, Likes, Dislikes */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                   <label htmlFor="like" className="block text-sm font-medium text-gray-700">Likes</label>
                                   <input
                                        id="like"
                                        type="number"
                                        min="0"
                                        {...register("like")}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   />
                              </div>

                              <div>
                                   <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                                   <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        {...register("price")}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   />
                              </div>

                              <div>
                                   <label htmlFor="dislike" className="block text-sm font-medium text-gray-700">Dislikes</label>
                                   <input
                                        id="dislike"
                                        type="number"
                                        min="0"
                                        {...register("dislike")}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                   />
                              </div>
                         </div>

                         {/* Submit Button */}
                         <div className="flex justify-end">
                              <button
                                   type="submit"
                                   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                   {'Update Content'}
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default UpdateContentFrom;
