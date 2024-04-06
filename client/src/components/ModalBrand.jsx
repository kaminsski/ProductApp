import axios from "axios";
import React from "react";

function ModalBrand({
  setNameModal,
  nameModal,
  editingCategoryId,
  brands,
  modal,
  setModal,
  setBrands,
  imageModal,
  setImageModal,
}) {
  const updateSubmit = async (e) => {
    const formData = new FormData();
    formData.append("name", nameModal);
    formData.append("image", imageModal);
    try {
      e.preventDefault();

      const response = await axios.put(
        `https://product-app-api.vercel.app/brand/${editingCategoryId}`,
        formData
      );

      const updatedCategories = brands.map((category) => {
        if (category._id === editingCategoryId) {
          return {
            ...category,
            name: nameModal,
            image: imageModal,
          };
        }
        return category;
      });
      setBrands(updatedCategories);

      setNameModal("");
      setImageModal("");
      setModal(!modal);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {modal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Update Category
                      </h3>
                      <div className="mt-2 w-full">
                        <div className="bg-white p-4 rounded shadow w-full">
                          <form
                            onSubmit={updateSubmit}
                            className="flex flex-col w-full"
                            encType="multipart/form-data"
                          >
                            <label htmlFor="name">Category name</label>
                            <input
                              onChange={(e) => setNameModal(e.target.value)}
                              value={nameModal}
                              type="text"
                              className="border p-2 mb-2"
                              id="name"
                              name="name"
                              required
                            />

                            <label htmlFor="image">Category image</label>
                            <input
                              onChange={(e) => {
                                setImageModal(e.target.files[0]);
                              }}
                              type="file"
                              className="border p-2 mb-2"
                              id="image"
                              name="image"
                              required
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={updateSubmit}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setModal(!modal)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalBrand;
